// const algoliasearch = require('algoliasearch')
// const client = algoliasearch(process.env.APPLICATION_ID, process.env.ADMIN_API_KEY);
// const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

// exports.search = (searchterm) =>
//     new Promise((resolve, reject) => {
//     index
//     .search(searchterm)
//     .then(({ hits }) => {
//             resolve(hits)
//             console.log('hits',hits)
//     })
//     .catch(err => {
//             reject(err);
//             console.log('err',err)
//         });

//     })
