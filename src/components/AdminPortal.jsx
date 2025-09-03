import React, { useState } from 'react';

const AdminPortal = () => {
  const [details, setDetails] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
    author: '',
    image: '',
  });
  const [keywordString, setKeywordString] = useState('');
  const [blocks, setBlocks] = useState([{ type: 'text', content: '', orderr: '' }]);
  const [postTitle, setPostTitle] = useState('');
  const [keywords, setKeywords] = useState([]);

  const handleAddBlock = () => {
    setBlocks([...blocks, { type: 'text', content: '', orderr: '' }]);
  };

  const handleChangeBlocks = (index, key, value) => {
    const newBlocks = [...blocks];
    newBlocks[index][key] = value;
    setBlocks(newBlocks);
  };

  // Move the initKeywords function here, outside of handleSubmit
  const initKeywords = () => {
    setKeywords(keywordString.split(','));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem('token');
    initKeywords(); // Ensure keywords are initialized before submission
    const response = await fetch('http://localhost:3000/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...details, blocks, keywords }),
    });

    if (response.ok) {
      console.log("Post added successfully");
      alert("Post added successfully");
    } else {
      console.log("Error adding post");
      alert("Error adding post");
    }
  };

  const handleAddKeyword = () => {
    setKeywords([...keywords, '']);
  };

  const handleKeywordChange = (index, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the post titled "${postTitle}"?`)) {
      return;
    }
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/posts/${postTitle}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      alert('Post deleted successfully');
    } else {
      alert('Error deleting post');
    }
  };

  return (
    <div>
      <h1>Manage Posts</h1>
      <h3>Post details</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={details.title}
          onChange={(e) => setDetails({ ...details, title: e.target.value })}
          placeholder="Title"
          required
        /><br></br>
        <input
          type="text"
          value={details.category}
          onChange={(e) => setDetails({ ...details, category: e.target.value })}
          placeholder="Category"
          required
        /><br></br>
        <textarea
          value={details.description}
          onChange={(e) => setDetails({ ...details, description: e.target.value })}
          placeholder="Description"
          required
        ></textarea><br></br>
        <input
          type="date"
          value={details.date}
          onChange={(e) => setDetails({ ...details, date: e.target.value })}
          required
        /><br></br>
        <input
          type="text"
          value={details.author}
          onChange={(e) => setDetails({ ...details, author: e.target.value })}
          placeholder="Author"
          required
        /><br></br>
        <input
          type="text"
          value={details.image}
          onChange={(e) => setDetails({ ...details, image: e.target.value })}
          placeholder="Image URL"
        />

        <h3>Blocks</h3>
        {blocks.map((block, index) => (
          <div key={index}>
            <select
              value={block.type}
              onChange={(e) => handleChangeBlocks(index, 'type', e.target.value)}
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="code">Code</option>
            </select>
            <br></br>
            <textarea
              type="text"
              value={block.content}
              onChange={(e) => handleChangeBlocks(index, 'content', e.target.value)}
              placeholder={`Enter ${block.type} content`}
            /><br></br>
            <input
              type="number"
              value={block.orderr}
              onChange={(e) => handleChangeBlocks(index, 'orderr', e.target.value)}
              placeholder="Order of the block"
            /><br></br>
          </div>
        ))}
        <button type="button" onClick={handleAddBlock}>Add Block</button><br></br>
        <h3>Keywords</h3>
        {keywords.map((keyword, index) => (
          <div key={index}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => handleKeywordChange(index, e.target.value)}
              placeholder="Keyword"
            />
          </div>
        ))}
    
        <button type="button" onClick={handleAddKeyword}>Add Keyword F1</button>
        <br></br>
        <textarea 
          value={keywordString}
          onChange={(e) => setKeywordString(e.target.value)} 
          placeholder="Enter keywords separated by commas"
        />
        <br></br>
        <button type="button" onClick={initKeywords}>Add keywords F2</button>
        <br></br>
        <button type="submit">Add Post</button>
      </form>

      <h2>Delete a Post</h2>
      <input
        type="text"
        placeholder="Post title"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
};

export default AdminPortal;
