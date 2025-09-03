# Album Viewer Documentation

Welcome to the Album Viewer application documentation. This directory contains comprehensive documentation for the project's utilities, tests, and development guidelines.

## 📋 Documentation Index

### Core Documentation
- **[Validator Utilities](./validators.md)** - Complete guide to the validator utility functions
- **[Test Documentation](./test-documentation.md)** - Detailed test case documentation and testing guidelines

### Quick Reference

#### Validator Functions
- `validateAndParseFrenchDate()` - Validates French date format (DD/MM/YYYY)

#### Test Commands
```bash
npm test                    # Run all tests
npm install                 # Install dependencies
npm start                   # Start the application
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   cd album-viewer
   npm install
   ```

2. **Run Tests**
   ```bash
   npm test
   ```

3. **Start Development**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
album-viewer/
├── docs/                   # Documentation (this folder)
│   ├── README.md          # This file
│   ├── validators.md      # Validator utilities documentation
│   └── test-documentation.md # Test documentation
├── utils/                 # Utility functions
│   └── validators.ts      # Date validation utilities
├── tests/                 # Test files
│   └── validators.test.ts # Validator tests
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🔧 Development Guidelines

### Code Quality Standards
- ✅ Always validate user inputs
- ✅ Use TypeScript for type safety
- ✅ Write comprehensive tests
- ✅ Document complex functions
- ✅ Handle edge cases properly

### Testing Standards
- ✅ Test both positive and negative scenarios
- ✅ Include edge case testing
- ✅ Use descriptive test names
- ✅ Maintain test isolation
- ✅ Keep tests up to date

## 🛠️ Available Tools

### Testing Framework
- **Mocha** - Test runner
- **Chai** - Assertion library
- **TypeScript** - Type-safe JavaScript

### Development Tools
- **ts-node** - TypeScript execution
- **npm scripts** - Task automation

## 📖 Additional Resources

### Workshop Context
This project is part of the VS Code Dev Days workshop in Nairobi (September 3rd, 2025). It demonstrates:
- GitHub Copilot integration
- Modern TypeScript development
- Test-driven development practices
- Documentation best practices

### Related Files
- `../package.json` - Project configuration and dependencies
- `../tsconfig.json` - TypeScript compiler settings
- `../utils/validators.ts` - Main validator implementation
- `../tests/validators.test.ts` - Test implementation

## 🤝 Contributing

When contributing to this project:

1. **Read the Documentation** - Understand existing patterns and standards
2. **Write Tests First** - Follow TDD practices
3. **Update Documentation** - Keep docs current with changes
4. **Follow TypeScript Best Practices** - Use proper typing
5. **Test Thoroughly** - Ensure comprehensive test coverage

## 📞 Support

For questions or issues:
- Review the documentation in this folder
- Check the test files for usage examples
- Use GitHub Copilot for code assistance
- Ask workshop mentors for guidance

---

*Last updated: September 3, 2025*
*Workshop: VS Code Dev Days - Nairobi*
