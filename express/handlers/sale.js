const { Sale, Product, User, Customer } = require('../models');

exports.createNewSale = async (req, res, next) => {
  const errors = {};
  const { product, user, customer } = req.body;
  const sale = await new Sale({
    user,
    customer,
    product,
  });
  await sale.save().then(newSale => {
    if (!newSale) {
      errors.global = 'Something went wrong while saving the sale';
      return res.status(400).json({ errors });
    }
    return res.status(201).json({ newSale, message: 'new sale was created' });
  });
};
// const pdfData = {
//   orderId: sale._id,
//   firstName: updateUser.firstName,
//   lastName: updateUser.lastName,
//   phone: updateUser.phone1,
//   email: updateUser.email,
//   address: updateUser.address,
//   productName: sale.productName,
//   description: sale.description,
//   sellPrice: sale.sellPrice,
// };
// const pathToPdf = getPath + '/' + pdfData.orderId + '.pdf';
// const pdfPath = await pdf(pathToPdf, pdfData);
// const pdfMessage = makeMailMessage(pdfData);
// const getPdf = await sendPdfToMail(pdfPath, pdfData.email, pdfMessage);
exports.changeSaleStage = async (req, res, next) => {
  await Sales.findByIdAndUpdate(
    {
      _id: req.body.params,
    },
    {
      $set: {
        stage: req.body.bodyData,
      },
    },
    { upsert: true },
    (err, updateSale) => {
      if (err) {
        errors.posts = 'לא נמצא מכירה';
        return res.status(400).json({ errors });
      }
      return updateSale.save();
    },
  )
    .then(newSale => {
      if (!newSale) {
        errors.message = new Error('מכירה לא נמצאה');
        return next(errors);
      }
      return res.status(200).json({ newSale: newSale.stage });
    })
    .catch(() => {
      const error = new Error(
        'קרתה תקלה בעת ניסיון לעדכן כתבה הנה נסו שוב מאוחר יותר',
      );
      error.status = 400;
      return next(error);
    });
};
exports.getUserActiveSales = async (req, res, next) => {
  try {
    const { user } = req.body;
    const sales = await Sales.find({ user });
    console.log(userSales);
    res.status(200).json({ sales });
  } catch (err) {
    const error = new Error('אופס משהו השתבש נסו שוב מאוחר יותר');
    return next(error);
  }
};

exports.getSaleById = async (req, res, next) => {
  try {
    const sale = await Sales.findById({
      _id: req.params.id,
      active: true,
    });
    res.status(200).json({ sale });
  } catch (err) {
    const errors = {};
    errors.message = new Error('אופס משהו השתבש :/ ');
    errors.status = 400;
    next(errors);
  }
};

exports.getAllActiveSells = async (req, res, next) => {
  const { currentPage, itemPerPage } = req.query;
  const query = {};
  if (currentPage <= 0) {
    const error = new Error('דף נוכחי לא נמצא');
    error.status = 302;
    return next(error);
  }
  try {
    const countSales = await Sales.countDocuments()
      .where('active')
      .equals(true);
    query.skip = +itemPerPage * (currentPage - 1);
    query.limit = +itemPerPage;

    const sales = await Sales.find({}, {}, query)
      .where('active')
      .equals(true);

    return res.status(200).json({ sales, countSales });
  } catch (err) {
    const error = new Error('אופס משהו השתבש');
    error.status = 400;
    return next(error);
  }
};
