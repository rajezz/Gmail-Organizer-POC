const { expect } = require("chai")
// const { describe, it } = require("mocha")

const { extractUserInfo } = require("../../helpers/thread")

describe("thread Helper", () => {
	describe("extractUserInfo", () => {
		it("CASE 1: Should return valid User info", () => {
			const expectedOutput = {
				name: "LinkedIn",
				email: "career-interests-noreply@linkedin.com"
			}
			const userInfo = extractUserInfo("LinkedIn <career-interests-noreply@linkedin.com>")
			expect(userInfo).to.deep.equal(expectedOutput)
		})
		it("CASE 2: Should return valid User info", () => {
			const expectedOutput = {
				name: "career-interests-noreply",
				email: "career-interests-noreply@linkedin.com"
			}
			const userInfo = extractUserInfo("career-interests-noreply@linkedin.com")
			expect(userInfo).to.deep.equal(expectedOutput)
		})
		it("CASE 1: Should return N/A", () => {
			const expectedOutput = {
				name: "N/A",
				email: "N/A"
			}
			const userInfo = extractUserInfo("LinkedIn career-interests-noreply@linkedin.com>")
			expect(userInfo).to.deep.equal(expectedOutput)
		})
		it("CASE 2: Should return N/A", () => {
			const expectedOutput = {
				name: "N/A",
				email: "N/A"
			}
			const userInfo = extractUserInfo("LinkedIn <career-interests-noreplylinkedin.com>")
			expect(userInfo).to.deep.equal(expectedOutput)
		})
		it("CASE 3: Should return N/A", () => {
			const expectedOutput = {
				name: "N/A",
				email: "N/A"
			}
			const userInfo = extractUserInfo("LinkedIn <career-interests-noreply@linkedin.com")
			expect(userInfo).to.deep.equal(expectedOutput)
		})
	})
})
