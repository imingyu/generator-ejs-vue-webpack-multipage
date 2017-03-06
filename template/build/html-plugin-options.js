module.exports = function getHtmlOptions(htmlName, srcHtmlFileName, pageChunkName) {
    var chunks = ['common'];
    if (pageChunkName) {
        chunks.push(pageChunkName);
    }

    var ops = {
        filename: htmlName + ".html",
        templateFile: srcHtmlFileName,
        template: "html!" + srcHtmlFileName,
        chunks: chunks,
        xhtml: true,
        cache: false,
        chunksSortMode: function (chunk1, chunk2) {
            var order1 = chunks.indexOf(chunk1.names[0]);
            var order2 = chunks.indexOf(chunk2.names[0]);
            if (order1 > order2) {
                return 1;
            } else if (order1 < order2) {
                return -1;
            } else {
                return 0;
            }
        }
    };
    return ops;
}