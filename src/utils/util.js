const getLastID = (links) => {
    let lastID;
  
    for (let i = 0; i < links.length; i++) {
      let currID = parseInt(links[i].id.split("-")[1]);
  
      if (!lastID || currID > lastID) {
        lastID = currID;
      }
    }
  
    return lastID;
  };

module.exports = {
    getLastID: getLastID,
}