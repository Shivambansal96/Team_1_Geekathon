document.addEventListener('DOMContentLoaded', async () => {
    chrome.storage.sync.get(null, (items) => { // Fetch all items from storage
        const bookmarksTable = document.getElementById('bookmarks-table').getElementsByTagName('tbody')[0];
        Object.keys(items).forEach(videoId => {
            const bookmarks = JSON.parse(items[videoId]);
            bookmarks.forEach(bookmark => {
                const row = bookmarksTable.insertRow();
                const videoCell = row.insertCell(0);
                const nameCell = row.insertCell(1);
                const descCell = row.insertCell(2);
                const linkCell = row.insertCell(3);
                const actionCell = row.insertCell(4);

                videoCell.textContent = bookmark.title || "Youtube Video";     
                nameCell.textContent = bookmark.name;
                descCell.textContent = bookmark.desc;
                linkCell.innerHTML = `<a href="https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(bookmark.time)}s" target="_blank" style="text-decoration: none">Open Video</a>`;
                actionCell.innerHTML = `<button onclick="deleteBookmark('${videoId}', ${bookmark.time})">Delete</button>`;
            });
        });
    });
});



function deleteBookmark(videoId, timestamp, row) {
    chrome.storage.sync.get(videoId, (result) => {
        let bookmarks = result[videoId] ? JSON.parse(result[videoId]) : [];
        bookmarks = bookmarks.filter(bookmark => bookmark.time !== timestamp);

        // Update storage with filtered bookmarks
        chrome.storage.sync.set({ [videoId]: JSON.stringify(bookmarks) }, () => {
            // Remove the row from the table
            row.remove();
        });
    });
}