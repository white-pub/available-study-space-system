module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './',
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        { tsconfig: './tsconfig.json' }
      ]
    },
    // remove any explicit testMatch/testRegex settings
  };
  
  
  