# Album Viewer Documentation

Welcome to the Album Viewer application documentation. This directory contains comprehensive documentation for the various components and utilities used in the project.

## Documentation Files

### [Validator Utility](./validator-utility.md)
Complete documentation for the validator utility functions, including:
- Function specifications and usage examples
- Implementation details and security considerations  
- Integration guidelines and best practices

### [Validator Tests](./validator-tests.md)
Detailed documentation of the test suite for validator utilities, including:
- Test case descriptions and expected outcomes
- Test framework setup and execution instructions
- Coverage analysis and testing principles

## Quick Reference

### Running Tests
```bash
cd album-viewer
npm test
```

### Project Structure
```
album-viewer/
├── utils/validators.ts     # Validator utility functions
├── tests/validators.test.ts # Comprehensive test suite
└── package.json           # Project dependencies (includes Mocha/Chai)
```

### Key Features
- **French Date Validation**: Robust validation of DD/MM/YYYY format dates
- **Comprehensive Testing**: Full test coverage with Mocha and Chai
- **TypeScript Support**: Full type safety and IDE integration
- **Error Handling**: Graceful handling of invalid inputs

## Contributing

When adding new utilities or modifying existing ones:

1. **Documentation**: Update relevant documentation files
2. **Testing**: Add comprehensive test cases for new functionality
3. **Code Quality**: Follow existing patterns and TypeScript conventions
4. **Security**: Consider input validation and security implications

## Development Guidelines

- All utilities should have corresponding tests
- Documentation should include usage examples
- Functions should handle edge cases gracefully
- Return types should be clearly defined and consistent
