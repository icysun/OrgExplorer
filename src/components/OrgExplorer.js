// Original code for rendering Org Explorer
function OrgExplorer() {
  // ... existing code ... 
}

// Modified code to include refresh button
function OrgExplorer() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchGitHubData(); // Assuming fetchGitHubData is the modified function from above
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && data && <div>
        {/* Render the Org Explorer UI using data */}
        <button onClick={() => fetchGitHubData()}>Refresh</button>
      </div>}
    </div>
  );
}
