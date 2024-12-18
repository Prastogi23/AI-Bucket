// const { ProductCategory, Product, SubProduct, Specification } = require('../../models');
const {contact} = require('../../models');
const { ObjectId } = require('mongodb');
const Deletecontact = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await contact.findByIdAndDelete(filter);
        // const products = await Product.find({ category: result._id });

        // for (const product of products) {
        //     await SubProduct.deleteMany({ _id: { $in: product.sub_products } });

        //     await Specification.deleteMany({ sub_product: { $in: product.sub_products } });
        // }

        // await Product.deleteMany({ category: result._id });

        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting contact: ${error.message}`);
    }
};

module.exports = Deletecontact;
