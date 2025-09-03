# GitHub Copilot Workshop Demo - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Quick Start Guide](#quick-start-guide)
5. [Project Structure](#project-structure)
6. [Backend API Documentation](#backend-api-documentation)
7. [Frontend Application Documentation](#frontend-application-documentation)
8. [Infrastructure Documentation](#infrastructure-documentation)
9. [Development Workflow](#development-workflow)
10. [Testing Strategy](#testing-strategy)
11. [Security Best Practices](#security-best-practices)
12. [Deployment Guide](#deployment-guide)
13. [Troubleshooting](#troubleshooting)
14. [Contributing Guidelines](#contributing-guidelines)
15. [Workshop Instructions](#workshop-instructions)

## Project Overview

This repository serves as a comprehensive learning environment for the GitHub Copilot Workshop during VS Code Dev Days in Nairobi (September 3rd, 2025). It demonstrates a modern multi-service application architecture using GitHub Copilot to accelerate development workflows.

### Key Features
- **Multi-language Support**: .NET 8, Node.js, TypeScript, and COBOL examples
- **Modern Architecture**: Microservices with API/Frontend separation
- **Cloud-Ready**: Azure deployment using Bicep and Terraform
- **Development Tools**: Comprehensive testing, validation utilities
- **Learning Focus**: Hands-on GitHub Copilot experience

### Business Domain
The application manages a music album catalog with the following capabilities:
- Album listing and browsing
- Album details view
- Search and filtering functionality
- Admin capabilities for album management

## Architecture

### System Architecture
```
┌─────────────────┐    HTTP    ┌─────────────────┐
│  Album Viewer   │ ────────▶  │   Albums API    │
│   (Frontend)    │            │   (.NET 8)      │
│  (Node.js/Pug)  │            │                 │
└─────────────────┘            └─────────────────┘
         │                               │
         │                               │
         ▼                               ▼
┌─────────────────┐            ┌─────────────────┐
│  Static Assets  │            │  In-Memory      │
│  (CSS/Images)   │            │  Data Store     │
└─────────────────┘            └─────────────────┘
```

### Technology Stack

#### Backend (Albums API)
- **Framework**: .NET 8 Web API
- **Language**: C#
- **Data Storage**: In-memory collections
- **Documentation**: Swagger/OpenAPI
- **CORS**: Enabled for cross-origin requests

#### Frontend (Album Viewer)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Template Engine**: Pug
- **Language**: JavaScript/TypeScript
- **Styling**: CSS3
- **Testing**: Mocha + Chai

#### Infrastructure
- **Cloud Platform**: Microsoft Azure
- **IaC Tools**: Bicep and Terraform
- **Container Platform**: Azure Container Apps
- **State Management**: Dapr
- **Monitoring**: Application Insights

## Prerequisites

### Development Environment
- **GitHub Account**: With Copilot access
- **Git**: Latest version
- **VS Code**: With GitHub Copilot extension
- **Node.js**: 18.x or later
- **.NET SDK**: 8.0 or later

### Optional Tools
- **Azure CLI**: For cloud deployment
- **Docker**: For containerization
- **Terraform**: For infrastructure as code

## Quick Start Guide

### 1. Environment Setup
```bash
# Clone the repository
git clone https://github.com/VSCDD-Kenya-Workshop/gh-copilot-demo.git
cd gh-copilot-demo

# Create your feature branch
git checkout -b <your-github-username>
```

### 2. Backend Setup
```bash
# Navigate to API project
cd albums-api

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the API
dotnet run
```

The API will be available at `https://localhost:7158` (HTTPS) or `http://localhost:5291` (HTTP).

### 3. Frontend Setup
```bash
# Navigate to frontend project
cd album-viewer

# Install dependencies
npm install

# Run the application
npm start
```

The frontend will be available at `http://localhost:3000`.

### 4. Running Tests
```bash
# Frontend tests
cd album-viewer
npm test

# Backend tests (if available)
cd albums-api
dotnet test
```

## Project Structure

```
gh-copilot-demo/
├── .devcontainer/           # Dev container configuration
├── .github/                 # GitHub workflows and templates
│   └── copilot-instructions.md
├── .vscode/                 # VS Code settings
├── album-viewer/            # Frontend Node.js application
│   ├── app.js              # Express application entry point
│   ├── package.json        # Dependencies and scripts
│   ├── routes/             # Express route handlers
│   ├── views/              # Pug templates
│   ├── public/             # Static assets
│   ├── utils/              # Utility functions
│   └── tests/              # Test files
├── albums-api/              # Backend .NET Web API
│   ├── Program.cs          # Application entry point
│   ├── Controllers/        # API controllers
│   ├── Models/             # Data models
│   └── Properties/         # Configuration files
├── iac/                     # Infrastructure as Code
│   ├── bicep/              # Azure Bicep templates
│   └── terraform/          # Terraform configurations
├── legacy/                  # Legacy code examples
│   └── albums.cbl          # COBOL example
├── assets/                  # Documentation assets
└── config/                  # Configuration files
```

## Backend API Documentation

### Albums API (.NET 8)

#### Base Configuration
- **Port**: 80 (Production), 7158 (Development HTTPS), 5291 (Development HTTP)
- **Environment Variables**:
  - `DAPR_HTTP_PORT`: Default "3500"
  - `COLLECTION_ID`: Default "GreatestHits"

#### Endpoints

##### GET /
- **Description**: Health check endpoint
- **Response**: Welcome message with usage instructions
- **Status Codes**: 200 OK

##### GET /albums
- **Description**: Retrieve all albums
- **Response**: Array of album objects
- **Example Response**:
```json
[
  {
    "id": 1,
    "title": "You, Me and an App Id",
    "artist": "Daprize",
    "price": 10.99,
    "image_url": "https://aka.ms/albums-daprlogo"
  }
]
```

##### GET /albums/{id}
- **Description**: Retrieve specific album by ID
- **Parameters**: 
  - `id` (path): Album identifier
- **Response**: Album object or 404 if not found

#### Data Model

```csharp
public record Album(
    int Id,
    string Title,
    string Artist,
    double Price,
    string Image_url
);
```

#### Sample Data
The API includes 6 sample albums with tech-themed names and Azure service logos.

#### CORS Configuration
- **Allowed Origins**: All origins (*)
- **Allowed Headers**: All headers (*)
- **Allowed Methods**: All methods (*)

#### Swagger Integration
- Available in Development environment
- Endpoint: `/swagger`
- Auto-generated API documentation

## Frontend Application Documentation

### Album Viewer (Node.js/Express)

#### Application Structure
```javascript
// app.js - Main application configuration
const express = require('express');
const app = express();

// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
```

#### Routes
- **GET /**: Homepage with album listing
- **Error Handling**: Comprehensive error pages for 404, 403, 503, and 500 errors

#### View Templates (Pug)
- **layout.pug**: Base template with common structure
- **index.pug**: Album listing page
- **error.pug**: Error page template

#### Static Assets
- **CSS**: Located in `public/stylesheets/style.css`
- **Images**: Served from `public/` directory

#### Utilities

##### Validators (`utils/validators.ts`)
```typescript
// French date validation and conversion
export function validateAndParseFrenchDate(dateString: string): Date | null {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
    // Implementation details...
}
```

#### Error Handling
The application provides detailed error handling with different responses based on error types:
- **404**: Resource not found
- **403**: Server error with response
- **503**: Communication error
- **500**: Unexpected server error

#### Internationalization
- **Translation Support**: `lang/translations.json`
- **Locale**: French date format support

## Infrastructure Documentation

### Azure Bicep Templates

#### Main Template (`iac/bicep/main.bicep`)
Provisions the complete Azure infrastructure:

```bicep
// Resource Group Parameters
param location string = resourceGroup().location
param uniqueSeed string = '${subscription().subscriptionId}-${resourceGroup().name}'
param uniqueSuffix string = 'da-${uniqueString(uniqueSeed)}'
```

#### Key Resources
1. **Log Analytics Workspace**: Centralized logging
2. **Application Insights**: Application monitoring
3. **Storage Account**: State store for Dapr
4. **Container Apps Environment**: Hosting platform
5. **Container Apps**: Application containers

#### Modules
- **container-app.bicep**: Container app configuration
- **dapr-statestore.bicep**: Dapr state store setup

### Terraform Configuration

Located in `iac/terraform/`, provides alternative infrastructure provisioning:
- **apps.tf**: Application resource definitions

### Container Configuration

#### Container Registry
- **Authentication**: Username/password based
- **Images**: 
  - API: Specified by `apiImage` parameter
  - Viewer: Specified by `viewerImage` parameter

#### Container Apps Configuration
- **API Container**: Port 80
- **Viewer Container**: Port 3000
- **Environment Variables**: Configured per container
- **Scaling**: Auto-scaling enabled

## Development Workflow

### GitHub Copilot Integration

#### Code Completion Workflow
1. **Setup**: Open VS Code with Copilot extension
2. **Context**: Provide meaningful comments and function signatures
3. **Review**: Always review suggestions against company standards
4. **Test**: Run tests after accepting suggestions

#### Agent Mode Features
- **Documentation Generation**: Automated documentation creation
- **Code Refactoring**: Large-scale code improvements
- **New Feature Development**: Complete feature implementation

#### Best Practices
- Use descriptive comments to guide Copilot
- Review all suggestions for security and quality
- Test thoroughly after accepting suggestions
- Commit changes incrementally

### Branching Strategy
```bash
# Create feature branch
git checkout -b feature/<your-github-username>

# Make changes and commit
git add .
git commit -m "feat: implement new feature"

# Push and create PR
git push origin feature/<your-github-username>
```

### Code Review Process
1. **Automated Checks**: GitHub Actions validation
2. **Security Review**: Security best practices verification
3. **Functionality Testing**: Feature validation
4. **Documentation**: Ensure documentation is updated

## Testing Strategy

### Frontend Testing (Mocha + Chai)

#### Test Structure
```typescript
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { validateAndParseFrenchDate } from '../utils/validators';

describe('validateAndParseFrenchDate', () => {
    it('should return a valid Date object for a valid date string', () => {
        const result = validateAndParseFrenchDate('31/12/2020');
        expect(result).to.be.instanceOf(Date);
        expect(result?.getDate()).to.equal(31);
        expect(result?.getMonth()).to.equal(11);
        expect(result?.getFullYear()).to.equal(2020);
    });
});
```

#### Running Tests
```bash
cd album-viewer
npm test
```

### Backend Testing

#### Unit Tests
- Test controllers and models
- Validate business logic
- Mock external dependencies

#### Integration Tests
- Test API endpoints
- Validate data flow
- Test error scenarios

### Test Coverage Goals
- **Unit Tests**: > 80% coverage
- **Integration Tests**: All critical paths
- **E2E Tests**: Main user journeys

## Security Best Practices

### Input Validation
- **SQL Injection Prevention**: Use parameterized queries
- **XSS Prevention**: Sanitize user inputs
- **Path Traversal**: Validate file paths

### Authentication & Authorization
- **API Keys**: Use environment variables
- **CORS**: Configure appropriately for production
- **HTTPS**: Enforce in production

### Secure Coding Guidelines
- Never hardcode secrets
- Validate all inputs
- Use proper error handling
- Implement rate limiting

### Example: Secure Controller
```csharp
[ApiController]
[Route("albums")]
public class AlbumController : ControllerBase
{
    [HttpGet("{id:int}")]
    public IActionResult GetAlbum(int id)
    {
        if (id <= 0)
            return BadRequest("Invalid album ID");
            
        // Implementation with proper validation
    }
}
```

## Deployment Guide

### Local Development
1. **Prerequisites**: Install .NET 8 SDK and Node.js 18+
2. **Backend**: `dotnet run` in albums-api directory
3. **Frontend**: `npm start` in album-viewer directory

### Azure Deployment

#### Using Bicep
```bash
# Login to Azure
az login

# Create resource group
az group create --name rg-albums-demo --location eastus

# Deploy infrastructure
az deployment group create \
  --resource-group rg-albums-demo \
  --template-file iac/bicep/main.bicep \
  --parameters registryName=myregistry \
               registryUsername=user \
               registryPassword=pass \
               apiImage=myregistry.azurecr.io/albums-api:latest \
               viewerImage=myregistry.azurecr.io/album-viewer:latest
```

#### Using Terraform
```bash
# Initialize Terraform
cd iac/terraform
terraform init

# Plan deployment
terraform plan

# Apply configuration
terraform apply
```

### CI/CD Pipeline
- **GitHub Actions**: Automated build and deployment
- **Container Registry**: Push images on successful build
- **Environment Promotion**: Dev → Staging → Production

## Troubleshooting

### Common Issues

#### API Not Starting
```bash
# Check .NET version
dotnet --version

# Restore packages
dotnet restore

# Check for port conflicts
netstat -an | grep :5291
```

#### Frontend Connection Issues
```bash
# Verify API is running
curl http://localhost:5291/albums

# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force
```

#### CORS Errors
- Verify CORS configuration in Program.cs
- Check browser developer tools for specific errors
- Ensure API URLs match frontend configuration

### Debug Configuration

#### VS Code Launch Settings
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": ".NET Core Launch (web)",
            "type": "coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "program": "${workspaceFolder}/albums-api/bin/Debug/net8.0/albums-api.dll",
            "args": [],
            "cwd": "${workspaceFolder}/albums-api",
            "stopAtEntry": false,
            "serverReadyAction": {
                "action": "openExternally",
                "pattern": "\\bNow listening on:\\s+(https?://\\S+)"
            },
            "env": {
                "ASPNETCORE_ENVIRONMENT": "Development"
            },
            "sourceFileMap": {
                "/Views": "${workspaceFolder}/Views"
            }
        }
    ]
}
```

## Contributing Guidelines

### Code Standards
- **C#**: Follow Microsoft coding conventions
- **TypeScript/JavaScript**: Use ESLint configuration
- **Naming**: Use descriptive, meaningful names
- **Comments**: Document complex business logic

### Pull Request Process
1. **Fork and Branch**: Create feature branch from main
2. **Development**: Implement changes with tests
3. **Testing**: Ensure all tests pass
4. **Documentation**: Update relevant documentation
5. **Review**: Submit PR with clear description

### Commit Message Format
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Scope: api, viewer, iac, docs
```

### Code Review Checklist
- [ ] Security best practices followed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No hardcoded secrets
- [ ] Error handling implemented
- [ ] Performance considerations addressed

## Workshop Instructions

### Workshop Flow (60 minutes)

#### Setup (10 minutes)
1. Access GitHub Codespace
2. Create personal branch
3. Verify environment

#### Hands-on Coding (30 minutes)
1. **Code Completion** (10 min): Implement validators
2. **Unit Testing** (10 min): Create comprehensive tests
3. **Agent Mode** (10 min): Generate documentation

#### GitHub Integration (10 minutes)
1. Create GitHub issue
2. Assign to Copilot agent
3. Review generated PR

#### Q&A and Wrap-up (10 minutes)

### Learning Objectives
- Master GitHub Copilot code completion
- Understand agent-based development
- Practice security-conscious coding
- Experience modern DevOps workflows

### Workshop Tips
- **Experiment**: Try different prompts and approaches
- **Ask Questions**: Use Copilot Chat for explanations
- **Review Code**: Always validate suggestions
- **Learn Patterns**: Understand how Copilot works best

### Extended Learning Resources
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [.NET 8 Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Azure Container Apps](https://docs.microsoft.com/en-us/azure/container-apps/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

---

## Appendix

### Environment Variables Reference
```bash
# API Configuration
ASPNETCORE_ENVIRONMENT=Development
DAPR_HTTP_PORT=3500
COLLECTION_ID=GreatestHits

# Azure Configuration
AZURE_SUBSCRIPTION_ID=your-subscription-id
AZURE_RESOURCE_GROUP=rg-albums-demo
AZURE_LOCATION=eastus
```

### Sample API Responses
```json
// GET /albums
[
  {
    "id": 1,
    "title": "You, Me and an App Id",
    "artist": "Daprize",
    "price": 10.99,
    "image_url": "https://aka.ms/albums-daprlogo"
  },
  {
    "id": 2,
    "title": "Seven Revision Army",
    "artist": "The Blue-Green Stripes",
    "price": 13.99,
    "image_url": "https://aka.ms/albums-containerappslogo"
  }
]
```

### Useful Commands Reference
```bash
# Development
dotnet watch run                    # Hot reload for API
npm run dev                        # Development server for frontend
npm test -- --watch               # Watch mode for tests

# Docker
docker build -t albums-api .       # Build API container
docker build -t album-viewer .     # Build frontend container
docker-compose up                  # Start all services

# Azure
az containerapp create             # Create container app
az containerapp update             # Update container app
az logs tail                       # View container logs
```

This comprehensive documentation provides a complete reference for the GitHub Copilot Workshop demo repository, covering all aspects from development to deployment, testing, and troubleshooting.
