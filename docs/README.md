# Album Viewer Documentation

## Overview

This documentation covers the utilities and testing infrastructure for the album-viewer Node.js application, part of the GitHub Copilot demo repository.

## Documentation Structure

### Utility Documentation
- **[Validator Utility](./validator-utility.md)** - Comprehensive guide to the date validation utility
  - Function reference and API
  - Usage examples and best practices
  - Implementation details and error handling
  - Integration notes and future enhancements

### Testing Documentation
- **[Validator Tests](./validator-tests.md)** - Complete test suite documentation
  - Test framework setup and execution
  - Test case descriptions and coverage analysis
  - Best practices for test maintenance
  - Performance considerations and CI/CD integration

## Quick Start

### Running Tests
```bash
cd album-viewer
npm test
```

### Using the Validator
```typescript
import { validateAndConvertDate } from './utils/validators';

const date = validateAndConvertDate("25/12/2023");
if (date) {
    console.log("Valid date:", date);
} else {
    console.log("Invalid date format or impossible date");
}
```

## Project Context

The album-viewer application is part of a multi-service demonstration showcasing:
- **Backend**: .NET 8 Web API (albums-api)
- **Frontend**: Node.js/Express with Pug templates
- **Infrastructure**: Azure deployment with Bicep/Terraform
- **Testing**: Mocha/Chai test framework

## Development Guidelines

When working with the validator utility:

1. **Security**: Always validate user input before processing
2. **Error Handling**: Use the null return pattern for graceful error handling
3. **Testing**: Write comprehensive tests for new validation functions
4. **Documentation**: Keep documentation updated when making changes

## Code Quality Standards

- **Input Validation**: Implement proper validation for all user inputs
- **Error Handling**: Use try-catch blocks with meaningful error messages
- **Testing**: Maintain high test coverage with edge case testing
- **Documentation**: Provide clear, comprehensive documentation

## Contributing

When adding new validators or modifying existing ones:

1. Follow the established patterns in `utils/validators.ts`
2. Add comprehensive test cases in `tests/validators.test.ts`
3. Update documentation in the `docs/` folder
4. Ensure all tests pass before submitting changes

## Related Resources

- [Main README](../README.md) - Project overview and setup instructions
- [Workshop Instructions](../.github/copilot-instructions.md) - GitHub Copilot workshop guidance
- [Album API Documentation](../albums-api/) - Backend API reference
