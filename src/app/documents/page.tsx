'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UploadCloud, File, Trash2, Eye, BrainCircuit, CheckCircle, AlertCircle } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

interface Document {
  id: string
  name: string
  type: string
  date: string
  status: 'Ready' | 'Processing' | 'Failed'
}

export default function DocumentsPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { data: documents = [], refetch } = useQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: async () => {
      const res = await fetch('/api/documents')
      if (!res.ok) throw new Error('Failed to fetch documents')
      return res.json()
    }
  })

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)

      // Simulate progress
      setUploadProgress(10)
      const interval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 15, 90))
      }, 200)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      clearInterval(interval)
      setUploadProgress(100)

      if (!res.ok) throw new Error('Upload failed')
      return res.json()
    },
    onSuccess: (data) => {
      toast.success(data.message || 'File uploaded successfully')
      refetch()
      setTimeout(() => setUploadProgress(0), 1000)
    },
    onError: () => {
      toast.error('Upload failed. Please try again.')
      setUploadProgress(0)
    }
  })

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadMutation.mutate(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadMutation.mutate(e.target.files[0])
    }
  }

  const deleteDocument = async (id: string) => {
    try {
      const res = await fetch(`/api/documents?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      toast.success('Document deleted')
      refetch()
    } catch (e) {
      toast.error('Failed to delete document')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Documents</h1>
        <p className="text-muted-foreground">Upload and manage company documents for the AI Brain.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-muted-foreground/20 hover:border-muted-foreground/50'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <UploadCloud className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium">Drag & drop your files here</p>
                <p className="text-sm text-muted-foreground mt-1">or click to browse from your computer</p>
              </div>
              <Input 
                type="file" 
                className="hidden" 
                id="file-upload" 
                onChange={handleFileChange}
              />
              <div className="mt-4">
                <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  Select Files
                </Button>
              </div>
            </div>
          </div>

          {uploadProgress > 0 && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <File className="h-4 w-4 text-muted-foreground" />
                      {doc.name}
                    </TableCell>
                    <TableCell className="uppercase text-xs font-semibold">{doc.type}</TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {doc.status === 'Ready' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {doc.status === 'Processing' && <BrainCircuit className="h-4 w-4 text-blue-500 animate-pulse" />}
                        {doc.status === 'Failed' && <AlertCircle className="h-4 w-4 text-red-500" />}
                        <span className="text-sm">{doc.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Analyze" onClick={() => toast.success('Analysis started')}>
                          <BrainCircuit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete" onClick={() => deleteDocument(doc.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {documents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No documents found. Upload one to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
