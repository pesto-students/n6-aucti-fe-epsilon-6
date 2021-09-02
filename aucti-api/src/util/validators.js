const isEmpty = (string) => {
	if (string !== null && string.trim() === "") return true;
	else return false;
};

const isNull = (data) => {
	if (data == null) return true;
	else return false;
};

exports.validateAddProductData = (data) => {
	let errors = {};

	if (isEmpty(data.title)) errors.title = "Title must not be empty";
	if (isEmpty(data.description))
		errors.description = "Description must not be empty";
	if (isEmpty(data.base_price))
		errors.base_price = "Base price must not be empty";
	if (isNull(data.product_picture))
		errors.product_picture = "Product image is not present";
	// if (isNull(data.product_document))
	// 	errors.product_document = "Product document is not present";

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

exports.validateUpdateProductData = (data) => {
	let errors = {};

	if (isEmpty(data.title)) errors.title = "Title must not be empty";
	// if (isEmpty(data.description))
	// 	errors.description = "Description must not be empty";
	if (isEmpty(data.base_price))
		errors.base_price = "Base price must not be empty";
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

exports.validateUser = (data) => {
	let errors = {};

	if (isEmpty(data.alias_name))
		errors.alias_name = "Alias name must not be empty";
	if (isEmpty(data.address)) errors.address = "Address must not be empty";
	if (isEmpty(data.phone_number))
		errors.phone_number = "Phone number must not be empty";

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};
