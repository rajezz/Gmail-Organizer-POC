const { expect } = require("chai");
const { beforeEach } = require("mocha");

const mongodbConnect = require("../../config/db")

const { validateAndSaveDoc } = require("../../services/thread.service");

describe("thread Service", () => {
    describe("validateAndSaveDoc", () => {
        beforeEach(()=>{
            mongodbConnect()
        })
        /* it("Should return true", async () => {
            const thread = {
                threadId: '1806efeff1c0ba93',
                threadHistoryId: '4363897',
                messages: [
                    {
                        messageId: '1806efeff1c0ba93',
                        messageHistoryId: '4363897',
                        from: { name: 'LinkedIn', email: 'career-interests-noreply@linkedin.com' },
                        labels: [
                            "UNREAD",
                            "CATEGORY_SOCIAL",
                            "INBOX"
                        ],
                        description: 'Explore career paths‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌',
                        date: 'Thu, 28 Apr 2022 07:07:25 GMT'
                    }
                ],
                user: { name: 'LinkedIn', email: 'career-interests-noreply@linkedin.com' },
                subject: 'Career path to Senior Software Developer and more',
                date: 'Thu, 28 Apr 2022 07:07:25 GMT'
            }

            const response = await validateAndSaveDoc(thread)
            expect(response).to.be.true
        })
        it("Should return false | no threadId", async () => {
            const thread = {
                threadId: '1806efeff1c0ba93',
                threadHistoryId: '4363897',
                messages: [
                    {
                        messageId: '1806efeff1c0ba93',
                        messageHistoryId: '4363897',
                        from: { name: 'LinkedIn', email: 'career-interests-noreply@linkedin.com' },
                        labels: [
                            "UNREAD",
                            "CATEGORY_SOCIAL",
                            "INBOX"
                        ],
                        description: 'Explore career paths‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌',
                        date: 'Thu, 28 Apr 2022 07:07:25 GMT'
                    }
                ],
                user: { name: 'LinkedIn', email: 'career-interests-noreply@linkedin.com' },
                date: 'Thu, 28 Apr 2022 07:07:25 GMT'
            }

            const response = await validateAndSaveDoc(thread)
            expect(response).to.be.false
        }) */
    })
})
