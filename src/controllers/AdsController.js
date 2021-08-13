const uuid = require('uuid');
const gimp = require('jimp');

const Category = require('../models/Category');
const User = require('../models/User');
const Ad = require('../models/Ad');

const addImage = async (buffer) => {
    let newName = `${uuid()}.jpg`;
    let tmpImg = await jimp.read(buffer);
    tmpImg.cover(500, 500).quality(80).write(`./public/media/${newName}`);
    return newName;
}

module.exports = {

    getCategories: async (req, res, next) => {
        
        const categories = await Category.find();

        let category = [];

        for (let i in categories) {
            category.push({
                ...categories[i]._doc,
                img: `${process.env.BASE}/assets/images/${categories[i].slug}.png`
            });
        }

        res.json({category: category});

    },

    getList: async (req, res, next) => {

    },

    getItem: async (req, res, next) => {

    },

    addAction: async (req, res) => {        

        let {title, price, priceneg, desc, cat, token} = req.params;            

        const user = await User.findOne({token}).exec();            
        console.log(user);    

        if(!title || !cat) {
            res.json({error: "Titulo e/ou categoria não foram enviados"});
            return;
        }

        if(price) {

            price = price.replace('.', '').replace(',', '.').replace('R$', '');
            price = parseFloat(price);

        } else {
            price = 0;
        }

        const newAd = new Ad();
        newAd.status = true;
        newAd.idUser = user._id;
        newAd.state = user.state;
        newAd.dateCreate = new Date();
        newAd.title = title;
        newAd.category = cat;
        newAd.price = price;
        newAd.priceNegotiable = (priceneg == 'true') ? true : false;
        newAd.description = desc;
        newAd.vies = 0;
        
        if(req.file && req.file.img) {
            
            if(req.file.img.length == undefined) {

                if(['img/jpeg', 'img/jpg', 'img/png'].includes(req.files.img.mimetype)) {
                       
                    let url = await addImage(req.files.img.data);
                    newAd.images.push({ 
                        url: url, 
                        default: false
                    });
                }

            } else {

                for(let i = 0; i < req.files.img.length; i++) {
                    if(['img/jpeg', 'img/jpg', 'img/png'].includes(req.files.img[i].mimetype)) {
                       
                        let url = await addImage(req.files.img[i].data);
                        newAd.images.push({ 
                            url: url, 
                            default: false
                        });
                    }
                }

            }
        }

        if(newAd.images.length > 0) {
            newAd.images[0].default = true;
        }

        const info = await newAd.save();
        res.json({id: info._id});

    },

    editAction: async (req, res, next) => {

    }

};