module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/**/*.test.ts'],
	verbose: true,
	forceExit: true,
};

// ,
// 	"jest": {
// 		"moduleFileExtensions": [
// 			"ts",
// 			"tsx",
// 			"js"
// 		],
// 		"transform": {
// 			"^.+\\.(ts|tsx)$": "ts-jest"
// 		},
// 		"globals": {
// 			"ts-jest": {
// 				"tsConfigFile": "tsconfig.json"
// 			}
// 		},
// 		"testMatch": [
// 			"**/__tests__/**.+(ts|tsx|js)"
// 		]
// 	}
