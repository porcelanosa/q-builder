module.exports = {
  globals: {
    'vue-jest': {
      babelConfig: true,
    },
  },
  moduleDirectories: [
      'src', 'node_modules'
  ],
  modulePaths: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  }
}
