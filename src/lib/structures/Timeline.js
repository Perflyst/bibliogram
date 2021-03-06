const RSS = require("rss")
const constants = require("../constants")
const config = require("../../../config")
const TimelineEntry = require("./TimelineEntry")
const InstaCache = require("../cache")
const collectors = require("../collectors")
require("../testimports")(constants, collectors, TimelineEntry, InstaCache)

/** @param {any[]} edges */
function transformEdges(edges) {
	return edges.map(e => {
		/** @type {import("../types").TimelineEntryAll} */
		const data = e.node
		const entry = collectors.getOrCreateShortcode(data.shortcode)
		entry.apply(data)
		return entry
	})
}

class Timeline {
	/**
	 * @param {import("./User")} user
	 */
	constructor(user) {
		this.user = user
		/** @type {import("./TimelineEntry")[][]} */
		this.pages = []
		this.addPage(this.user.data.edge_owner_to_timeline_media)
		this.page_info = this.user.data.edge_owner_to_timeline_media.page_info
	}

	hasNextPage() {
		return this.page_info.has_next_page
	}

	fetchNextPage() {
		if (!this.hasNextPage()) return constants.symbols.NO_MORE_PAGES
		return collectors.fetchTimelinePage(this.user.data.id, this.page_info.end_cursor).then(page => {
			this.addPage(page)
			return this.pages.slice(-1)[0]
		})
	}

	async fetchUpToPage(index) {
		while (this.pages[index] === undefined && this.hasNextPage()) {
			await this.fetchNextPage()
		}
	}

	addPage(page) {
		this.pages.push(transformEdges(page.edges))
		this.page_info = page.page_info
	}

	async fetchFeed() {
		const feed = new RSS({
			title: `@${this.user.data.username}`,
			feed_url: `${config.website_origin}/u/${this.user.data.username}/rss.xml`,
			site_url: config.website_origin,
			description: this.user.data.biography,
			image_url: config.website_origin+this.user.proxyProfilePicture,
			pubDate: new Date(this.user.cachedAt),
			ttl: this.user.getTtl(1000*60) // scale to minute
		})
		const page = this.pages[0] // only get posts from first page
		await Promise.all(page.map(item =>
			item.fetchFeedData().then(feedData => feed.item(feedData))
		))
		return feed
	}
}

module.exports = Timeline
