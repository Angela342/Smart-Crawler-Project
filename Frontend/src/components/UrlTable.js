import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UrlTable.css'; // Import the CSS for styling

const UrlTable = () => {
    const [contents, setContents] = useState([]);
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [expandedContent, setExpandedContent] = useState(null); // Manage expanded content

    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = async () => {
        try {
            const response = await axios.get('/api/contents');
            setContents(response.data);
        } catch (error) {
            console.error('Error fetching contents:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/contents', { url, content: '', contentType: 'url' });
            fetchContents();
            setUrl('');
        } catch (error) {
            console.error('Error adding content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExpand = (contentId) => {
        setExpandedContent(expandedContent === contentId ? null : contentId);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Add URL'}
                </button>
            </form>
            <table className="content-table">
                <thead>
                    <tr>
                        <th className="id-col">ID</th>
                        <th className="url-col">URL</th>
                        <th className="content-col">Content</th>
                        <th className="type-col">Content Type</th>
                    </tr>
                </thead>
                <tbody>
                    {contents.map((content) => (
                        <tr key={content.id}>
                            <td className="id-col">{content.id}</td>
                            <td className="url-col">{content.url}</td>
                            <td className="content-col">
                                {expandedContent === content.id
                                    ? content.content
                                    : content.content.length > 100
                                    ? content.content.substring(0, 100) + '...'
                                    : content.content
                                }
                                {content.content.length > 100 && (
                                    <button onClick={() => handleExpand(content.id)}>
                                        {expandedContent === content.id ? 'Read Less' : 'Read More'}
                                    </button>
                                )}
                            </td>
                            <td className="type-col">{content.contentType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UrlTable;
