// Original code for fetching GitHub data
async fetchGitHubData() {
  try {
    const response = await fetch('https://api.github.com/orgs/AOSSIE-Org/repos');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
}

// Modified code with caching
async fetchGitHubData() {
  const cacheKey = 'githubDataCache';
  const cachedData = localStorage.getItem(cacheKey);
  const cacheExpiry = localStorage.getItem(`${cacheKey}_expiry`);
  const now = Date.now();

  if (cachedData && now < cacheExpiry) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch('https://api.github.com/orgs/AOSSIE-Org/repos');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const expiry = Date.now() + 5 * 60 * 1000; // TTL of 5 minutes
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(`${cacheKey}_expiry`, expiry);
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
}
