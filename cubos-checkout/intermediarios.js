 const logarRequisicao = (req, res, next) => {
    console.log(req.method, req.url);
    console.log("req.body =>", req.body);
    console.log("req.query =>", req.query);
    next();
};

module.exports = {
    logarRequisicao
}