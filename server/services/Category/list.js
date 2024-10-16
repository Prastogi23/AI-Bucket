const { category } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewCategory = async ({ id, status, createdby, name, sort, select, page, size }) => {
    try {
        const queryObject = {};
        
        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }
        if (status !== undefined) {
            queryObject.status = status.toLowerCase() === 'true';
        }
        if (createdby) {
            queryObject.createdby = createdby;
        }
        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') };
        }

        // ======== Short , Select ======

        let apiData = category.find(queryObject);
        let ObjCount = await category.countDocuments(queryObject);
        console.log(apiData)
        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        } else {
            apiData = apiData.sort({ createdAt: -1 });
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit);

        // const Categories = await apiData.populate('products').exec();
        // return { Categories, total: ObjCount };
        const Categories = await apiData.exec(); 
        return {Categories , total: ObjCount }
    } catch (error) {
        throw new Error('An error occurred while fetching Product Category: ' + error.message);
    }
};

module.exports = ViewCategory;
