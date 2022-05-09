exports.asyncForEach = async (arr, method) => {
	for (let index = 0; index < arr.length; index++) {
		await method(arr[index], index)
	}
}

exports.sendResponse = (res, statusCode, message) => res.status(statusCode).send(message)

exports.delayProcess = async (duration) =>
	new Promise((resolve) => setTimeout(() => resolve(), duration))
