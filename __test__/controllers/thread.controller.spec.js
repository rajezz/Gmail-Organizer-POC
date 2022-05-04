const { expect } = require("chai")
const { it } = require("mocha")
const proxyquire = require("proxyquire").noCallThru();

const getStoredThreadsStub = () => ({
    "1806efeff1c0ba93": {
        "messages": [
            {
                "messageId": "1806efeff1c0ba93",
                "labels": [
                    "UNREAD",
                    "CATEGORY_SOCIAL",
                    "INBOX"
                ],
                "description": "Explore career paths‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌",
                "sizeEstimate": 52276,
                "messageHistoryId": "4363897",
                "deliveredTo": "rajezzandrj@gmail.com",
                "from": "LinkedIn <career-interests-noreply@linkedin.com>",
                "subject": "Career path to Senior Software Developer and more",
                "to": "Rajeswaran A <rajezzandrj@gmail.com>",
                "date": "Thu, 28 Apr 2022 07:07:25 +0000 (UTC)"
            }
        ],
        "threadId": "1806efeff1c0ba93",
        "threadHistoryId": "4363897"
    }
})

const validateAndSaveDocStub = () => { }
const sendResponseStub = (res, statusCode, message) => {
    console.error("Message >", message)
    return statusCode}

const { formatThread } = proxyquire("../../controllers/thread.controller", {
    "../helpers/common": { sendResponse: sendResponseStub },
    "../services/thread": { validateAndSaveDoc: validateAndSaveDocStub, getStoredThreads: getStoredThreadsStub },
})

describe("thread controller", () => {
    describe("formatThread", () => {
        it("Should return true", async () => {
            try {
                const response = await formatThread({}, {})
                expect(response).to.be.equal(200)
            } catch (error) {
                throw new Error(error)
            }
        })
    })
})