export default function toQuery(query: Record<string, string>): string {
    const search = new URLSearchParams();
    for (const [name, value] of Object.entries(query)) {
      search.set(name, value);
    }
    return search.toString();
  }