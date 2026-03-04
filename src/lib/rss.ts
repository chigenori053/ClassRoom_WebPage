export interface NoteArticle {
    title: string;
    link: string;
    pubDate: string;
    contentSnippet?: string;
}

export async function fetchNoteArticles(noteId: string = 'yosshi_kukkat'): Promise<NoteArticle[]> {
    try {
        // Attempt to fetch from the specified note ID.
        // Replace 'yosshi_kukkat' with the actual KuKKA note ID if known, or use env variable.
        const url = process.env.NOTE_RSS_URL || `https://note.com/${noteId}/rss`;

        // Use native fetch with Next.js revalidation cache (e.g. 1 hour)
        const res = await fetch(url, { next: { revalidate: 3600 } });

        if (!res.ok) {
            // Log a clean warning instead of full error trace to avoid console noise
            console.warn(`Note RSS fetch returned status: ${res.status} for ${url}`);
            return [];
        }

        const xml = await res.text();
        const items: NoteArticle[] = [];

        // Simple regex parsing for basic RSS <item> tags
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;
        let count = 0;

        while ((match = itemRegex.exec(xml)) !== null && count < 3) {
            const itemXml = match[1];
            const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
            const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
            const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);

            const title = titleMatch ? (titleMatch[1] || titleMatch[2]) : '無題';
            const link = linkMatch ? linkMatch[1] : '#';
            const pubDate = pubDateMatch ? pubDateMatch[1] : new Date().toISOString();

            items.push({ title, link, pubDate });
            count++;
        }

        return items;
    } catch (error) {
        console.warn('Failed to fetch Note RSS feed:', error instanceof Error ? error.message : String(error));
        return [];
    }
}
