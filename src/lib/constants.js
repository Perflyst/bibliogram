module.exports = {
	image_cache_control: `public, max-age=${7*24*60*60}`,
	resource_cache_time: 30*60*1000,

	external: {
		timeline_query_hash: "e769aa130647d2354c40ea6a439bfc08",
		timeline_fetch_first: 12,
		username_regex: "[\\w.]+"
	},

	symbols: {
		NO_MORE_PAGES: Symbol("NO_MORE_PAGES")
	}
}
