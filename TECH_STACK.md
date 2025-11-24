# 🛠️ TECH STACK CHI TIẾT

## 📦 OVERVIEW

```
Backend:   NestJS 10 + TypeScript
Frontend:  Next.js 14 + React 18
Database:  MongoDB 7 + Mongoose
Cache:     Redis 7
Deploy:    Docker + Vercel + MongoDB Atlas
```

---

## 🔧 BACKEND: NESTJS

### Core Framework
```bash
@nestjs/core        # 10.x - Core framework
@nestjs/common      # 10.x - Common utilities
@nestjs/platform-express  # Express adapter
```

### Database & ORM
```bash
@nestjs/mongoose    # 10.x - MongoDB integration
mongoose            # 8.x - MongoDB ODM
```

### Authentication & Security
```bash
@nestjs/jwt         # JWT authentication
@nestjs/passport    # Passport integration
passport            # Authentication middleware
passport-jwt        # JWT strategy
bcryptjs            # Password hashing
@types/bcryptjs     # TypeScript types
```

### Validation & Transformation
```bash
class-validator     # DTO validation
class-transformer   # Object transformation
```

### Configuration
```bash
@nestjs/config      # Configuration management
dotenv              # Environment variables
```

### Caching
```bash
@nestjs/cache-manager  # Cache abstraction
cache-manager       # Cache manager
cache-manager-redis-store  # Redis store
redis              # Redis client
```

### Job Queues
```bash
@nestjs/bull        # Bull integration
bull                # Job queue
```

### API Documentation
```bash
@nestjs/swagger     # Swagger/OpenAPI
swagger-ui-express  # Swagger UI
```

### File Upload & Storage
```bash
@nestjs/platform-express  # Multer support
aws-sdk             # AWS S3 SDK
multer-s3           # S3 storage engine
cloudinary          # Cloudinary SDK
```

### Email & SMS
```bash
@nestjs-modules/mailer  # Email module
nodemailer          # Email client
sendgrid            # SendGrid API
twilio              # SMS service
```

### Testing
```bash
@nestjs/testing     # Testing utilities
jest                # Test framework
supertest           # HTTP testing
@types/supertest    # TypeScript types
```

### Utilities
```bash
dayjs               # Date manipulation
lodash              # Utility functions
@types/lodash       # TypeScript types
uuid                # UUID generation
@types/uuid         # TypeScript types
```

---

## 🎨 FRONTEND: NEXT.JS

### Core Framework
```bash
next                # 14.x - React framework
react               # 18.x - UI library
react-dom           # 18.x - DOM renderer
typescript          # 5.x - Type safety
```

### Styling
```bash
tailwindcss         # 3.x - Utility-first CSS
postcss             # CSS processor
autoprefixer        # CSS vendor prefixing
@tailwindcss/forms  # Form styles
@tailwindcss/typography  # Typography plugin
```

### UI Components
```bash
@radix-ui/react-*   # Headless UI primitives
lucide-react        # Icon library
```

**shadcn/ui components** (copy-paste):
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add table
npx shadcn-ui@latest add calendar
# ... and more as needed
```

### Data Fetching & State
```bash
@tanstack/react-query  # Data fetching & caching
axios               # HTTP client
zustand             # State management (lightweight)
```

### Forms & Validation
```bash
react-hook-form     # Form management
zod                 # Schema validation
@hookform/resolvers # RHF + Zod integration
```

### Authentication
```bash
next-auth           # Authentication (Auth.js v5)
@auth/core          # Core auth utilities
```

### Date & Time
```bash
date-fns            # Date utilities
react-day-picker    # Date picker
```

### Rich Text Editor
```bash
@tiptap/react       # Rich text editor
@tiptap/starter-kit # Tiptap extensions
```

### Charts & Visualization
```bash
recharts            # Chart library
```

### Calendar
```bash
@fullcalendar/core  # Calendar core
@fullcalendar/react # React adapter
@fullcalendar/daygrid  # Day grid view
```

### Maps
```bash
react-leaflet       # Map component
leaflet             # Map library
```

### File Upload
```bash
react-dropzone      # Drag & drop upload
```

### Image Handling
```bash
sharp               # Image processing (backend)
```

### Utilities
```bash
clsx                # Class name utility
class-variance-authority  # CVA
tailwind-merge      # Merge Tailwind classes
```

### Theme
```bash
next-themes         # Dark mode support
```

### Markdown
```bash
next-mdx-remote     # MDX support
remark              # Markdown processor
rehype              # HTML processor
```

### SEO
```bash
# Built-in Next.js features:
# - Metadata API
# - generateMetadata()
# - sitemap.xml
# - robots.txt
```

### Analytics
```bash
@vercel/analytics   # Vercel Analytics
```

### Testing
```bash
@testing-library/react  # React Testing Library
@testing-library/jest-dom  # Jest DOM matchers
@playwright/test    # E2E testing
```

---

## 🗄️ DATABASE: MONGODB

### Core
```bash
mongodb             # 7.x - MongoDB driver
mongoose            # 8.x - ODM
```

### Tools
```bash
# MongoDB Compass - Official GUI
# Download: https://www.mongodb.com/products/compass

# MongoDB Shell
mongosh             # Interactive shell

# MongoDB Atlas - Cloud hosting
# https://www.mongodb.com/atlas
```

### Mongoose Plugins
```bash
mongoose-paginate-v2  # Pagination
mongoose-delete     # Soft delete
mongoose-slug-generator  # Auto slug
mongoose-timestamp  # Timestamps
```

---

## 💾 CACHE: REDIS

### Core
```bash
redis               # 7.x - Redis client
ioredis             # Alternative client (more features)
```

### Tools
```bash
# RedisInsight - Official GUI
# Download: https://redis.io/insight/

# Redis CLI
redis-cli           # Command-line interface

# Redis Cloud
# https://redis.com/try-free/
```

---

## 🐳 DEVOPS & DEPLOYMENT

### Containerization
```bash
# Docker
docker              # Container platform
docker-compose      # Multi-container orchestration
```

**Dockerfile** (Backend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main"]
```

**docker-compose.yml**
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
  
  backend:
    build: ./car-rental-api
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
      - redis
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/car-rental
      - REDIS_HOST=redis

volumes:
  mongodb_data:
```

### CI/CD
```bash
# GitHub Actions
.github/workflows/ci.yml
.github/workflows/deploy.yml
```

### Cloud Services

**Backend Hosting:**
- DigitalOcean Droplets
- AWS EC2
- Google Cloud Run
- Railway.app
- Render.com

**Frontend Hosting:**
- Vercel (Recommended for Next.js)
- Netlify
- Cloudflare Pages

**Database:**
- MongoDB Atlas (Recommended)
- DigitalOcean Managed MongoDB

**Cache:**
- Redis Cloud (Recommended)
- AWS ElastiCache
- DigitalOcean Managed Redis

**Storage:**
- AWS S3
- Cloudinary
- DigitalOcean Spaces

---

## 🔧 DEVELOPMENT TOOLS

### Code Editor
```bash
# VS Code (Recommended)
# Extensions:
- ESLint
- Prettier
- MongoDB for VS Code
- Tailwind CSS IntelliSense
- GitLens
- REST Client
- Docker
```

### API Testing
```bash
# Postman - API client
# Insomnia - Alternative
# REST Client - VS Code extension
```

### Database Tools
```bash
# MongoDB Compass - GUI
# Studio 3T - Advanced GUI
# Robo 3T - Lightweight GUI
```

### Version Control
```bash
git                 # Version control
gh                  # GitHub CLI
```

### Package Managers
```bash
npm                 # Default
yarn                # Alternative
pnpm                # Alternative (faster)
```

---

## 📊 MONITORING & LOGGING

### Error Tracking
```bash
@sentry/node        # Backend error tracking
@sentry/nextjs      # Frontend error tracking
```

### Logging
```bash
winston             # Logging library (NestJS)
pino                # Alternative (faster)
```

### Analytics
```bash
@vercel/analytics   # Vercel Analytics
google-analytics    # Google Analytics 4
mixpanel            # Product analytics
```

### Performance
```bash
# Lighthouse - Performance audit
# New Relic - APM
# Datadog - Full-stack monitoring
```

---

## 🔒 SECURITY

### Authentication
```bash
jsonwebtoken        # JWT
bcryptjs            # Password hashing
passport            # Authentication middleware
```

### Security Headers
```bash
helmet              # Security headers (Express)
```

### Rate Limiting
```bash
@nestjs/throttler   # Rate limiting (NestJS)
```

### CORS
```bash
# Built-in NestJS CORS support
```

### Environment Variables
```bash
dotenv              # Environment variables
@nestjs/config      # NestJS config module
```

---

## 📦 PACKAGE VERSIONS

### Backend (package.json)
```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/mongoose": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "mongoose": "^8.0.0",
    "passport-jwt": "^4.0.1",
    "class-validator": "^0.14.0",
    "redis": "^4.6.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "jest": "^29.0.0"
  }
}
```

### Frontend (package.json)
```json
{
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "axios": "^1.6.0",
    "@tanstack/react-query": "^5.0.0",
    "next-auth": "^5.0.0-beta",
    "react-hook-form": "^7.50.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## 🎓 LEARNING RESOURCES

### NestJS
- Docs: https://docs.nestjs.com
- University: https://courses.nestjs.com
- GitHub: https://github.com/nestjs/nest

### Next.js
- Docs: https://nextjs.org/docs
- Learn: https://nextjs.org/learn
- GitHub: https://github.com/vercel/next.js

### MongoDB
- Docs: https://www.mongodb.com/docs
- University: https://university.mongodb.com
- Mongoose: https://mongoosejs.com

### TypeScript
- Handbook: https://www.typescriptlang.org/docs
- Playground: https://www.typescriptlang.org/play

---

## ✅ INSTALLATION CHECKLIST

- [ ] Node.js 18+ installed
- [ ] npm/yarn/pnpm configured
- [ ] NestJS CLI global installed
- [ ] MongoDB 7+ installed
- [ ] Redis 7+ installed
- [ ] MongoDB Compass installed
- [ ] Redis Insight installed
- [ ] VS Code + Extensions
- [ ] Postman/Insomnia
- [ ] Git configured
- [ ] Docker Desktop (for deployment)

---

**🎉 YOU'RE READY WITH MODERN STACK!**

**Next:** Follow QUICKSTART.md to create your first project!

Good luck! 🚀
