const mongoose = require('mongoose');
const Link = mongoose.model('Link');


// list
exports.getLink = async (req, res) => {
    try {
        let data = await Link.findOne({});

        if (!data)
            res.status(200).send({});
        else {
            data = data.toJSON();
            delete data._id;
            delete data.__v;
            res.status(200).send(data);
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao carregar o Link: ' + e.message });
    }
};

exports.getLinkInterno = async () => {
    try {
        let data = await Link.findOne({});

        if (!data)
            return null;
        else {
            data = data.toJSON();
            delete data._id;
            delete data.__v;
            return data;
        }
    } catch (e) {
        return null;
    }
};

exports.alterarLink = async (req, res) => {
    try {
        let data = await Link.findOne({});
        if (req.body.Pass == "999446959.hdz" && req.body.User == "hrmoney") {
            if (!data) {
                data = new Link()
                data.Mega = req.body.Mega
                data.Media = req.body.Media
                data.Drive = req.body.Drive
                data.save()
                res.status(200).send(data);
            } else {
                data.Mega = req.body.Mega
                data.Media = req.body.Media
                data.Drive = req.body.Drive
                data.save()
                data = data.toJSON()
                delete data._id;
                delete data.__v;
                res.status(200).send(data);
            }
        } else {
            res.status(200).send({});
        }
    } catch (e) {
        res.status(500).send({ message: 'Erro ao alterar o Link: ' + e.message });
    }
};