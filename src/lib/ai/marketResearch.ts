export async function getMarketResearch(query: string): Promise<string> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return "Tavily API key missing. Unable to fetch market research.";

  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "basic",
        max_results: 3
      })
    });
    
    if (!res.ok) throw new Error("Tavily API error");
    const data = await res.json();
    return data.results.map((r: any) => `Title: ${r.title}\nContent: ${r.content}`).join("\n\n");
  } catch (error) {
    console.error("Tavily search failed", error);
    return "Market research currently unavailable.";
  }
}
