exports.asyncForEach = async function (arr, method) {
	for (let index = 0; index < arr.length; index++) {
		await method(arr[index], index)
	}
}

exports.sendResponse = (res, statusCode, message) => {
    return res.status(statusCode).send(message)
}