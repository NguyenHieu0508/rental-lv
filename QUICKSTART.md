# ⚡ QUICKSTART - BẮT ĐẦU TRONG 10 PHÚT

## 🎯 MỤC TIÊU
Sau 10 phút, bạn sẽ có:
✅ Backend NestJS chạy được
✅ Frontend Next.js chạy được
✅ MongoDB + Redis running
✅ Test được API đầu tiên

---

## BƯỚC 1: INSTALL TOOLS (3 phút)

### MacOS
```bash
# Homebrew (nếu chưa có)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 18+
brew install node

# MongoDB 7
brew tap mongodb/brew
brew install mongodb-community@7.0

# Redis 7
brew install redis

# NestJS CLI (global)
npm i -g @nestjs/cli

# Verify installations
node --version    # v18.0.0+
npm --version     # v9.0.0+
nest --version    # v10.0.0+
mongod --version  # v7.0.0+
redis-server --version  # v7.0.0+
```

### Ubuntu/Linux
```bash
# Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# MongoDB 7
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Redis 7
sudo apt-get install redis-server

# NestJS CLI
sudo npm i -g @nestjs/cli
```

### Windows
```powershell
# Install Node.js from https://nodejs.org
# Install MongoDB from https://www.mongodb.com/try/download/community
# Install Redis from https://redis.io/download (or use Docker)

# NestJS CLI
npm i -g @nestjs/cli
```

---

## BƯỚC 2: CREATE BACKEND (2 phút)

```bash
# Create NestJS project
nest new car-rental-api
cd car-rental-api

# Install MongoDB dependencies
npm install @nestjs/mongoose mongoose

# Install other dependencies
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/config
npm install class-validator class-transformer

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/car-rental
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=1h
PORT=3000
EOF

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux

# Start Redis
brew services start redis              # macOS
sudo systemctl start redis-server      # Linux

# Test backend
npm run start:dev

# Open browser: http://localhost:3000
# Should see: Hello World!
```

---

## BƯỚC 3: CREATE FRONTEND (2 phút)

```bash
# Open new terminal
cd ..

# Create Next.js project
npx create-next-app@latest car-rental-ui --typescript --tailwind --app

# Choose options:
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No

cd car-rental-ui

# Install dependencies
npm install axios @tanstack/react-query
npm install next-auth
npm install react-hook-form zod @hookform/resolvers

# Start frontend
npm run dev

# Open browser: http://localhost:3000
# Should see Next.js homepage
```

---

## BƯỚC 4: CREATE FIRST API (3 phút)

### Backend (NestJS)

```bash
cd car-rental-api

# Generate Vehicle module
nest g module vehicle
nest g controller vehicle
nest g service vehicle

# Generate DTO
nest g class vehicle/dto/create-vehicle.dto --no-spec
```

**Edit: src/vehicle/entities/vehicle.schema.ts**
```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Vehicle extends Document {
  @Prop({ required: true })
  vehicleName: string;

  @Prop({ required: true })
  vehicleType: string;

  @Prop({ required: true })
  licensePlate: string;

  @Prop({ required: true })
  seats: number;

  @Prop({ default: 'AVAILABLE' })
  status: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
```

**Edit: src/vehicle/vehicle.module.ts**
```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle, VehicleSchema } from './entities/vehicle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }])
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
```

**Edit: src/vehicle/vehicle.service.ts**
```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from './entities/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>
  ) {}

  async findAll() {
    return this.vehicleModel.find().exec();
  }

  async create(createVehicleDto: any) {
    const vehicle = new this.vehicleModel(createVehicleDto);
    return vehicle.save();
  }
}
```

**Edit: src/vehicle/vehicle.controller.ts**
```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Post()
  create(@Body() createVehicleDto: any) {
    return this.vehicleService.create(createVehicleDto);
  }
}
```

**Edit: src/app.module.ts**
```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/car-rental'),
    VehicleModule,
  ],
})
export class AppModule {}
```

**Restart backend:**
```bash
npm run start:dev
```

---

## BƯỚC 5: TEST API (1 phút)

### Using cURL
```bash
# Create vehicle
curl -X POST http://localhost:3000/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleName": "Toyota Camry 2024",
    "vehicleType": "Sedan",
    "licensePlate": "29A-12345",
    "seats": 5,
    "status": "AVAILABLE"
  }'

# Get all vehicles
curl http://localhost:3000/vehicles
```

### Using Postman
```
1. Open Postman
2. POST http://localhost:3000/vehicles
3. Body → raw → JSON:
{
  "vehicleName": "Toyota Camry 2024",
  "vehicleType": "Sedan",
  "licensePlate": "29A-12345",
  "seats": 5,
  "status": "AVAILABLE"
}
4. Send
5. GET http://localhost:3000/vehicles
```

---

## BƯỚC 6: CONNECT FRONTEND TO BACKEND (BONUS)

**Create: app/vehicles/page.tsx**
```typescript
'use client';

import { useEffect, useState } from 'react';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/vehicles')
      .then(res => res.json())
      .then(data => setVehicles(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
      <div className="grid gap-4">
        {vehicles.map((vehicle: any) => (
          <div key={vehicle._id} className="border p-4 rounded">
            <h2 className="font-bold">{vehicle.vehicleName}</h2>
            <p>{vehicle.vehicleType} - {vehicle.seats} seats</p>
            <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Visit: http://localhost:3001/vehicles**

---

## 🎉 CONGRATULATIONS!

Bạn đã có:
✅ Backend NestJS với MongoDB
✅ Frontend Next.js với Tailwind
✅ API endpoint hoạt động
✅ Data từ frontend → backend → database

---

## 🚀 NEXT STEPS

1. **Đọc Excel Roadmap**
   - Mở file: Car_Rental_Roadmap_Modern_Stack.xlsx
   - Follow từng task trong Phase 1

2. **Đọc Documentation**
   - TECH_STACK.md - Chi tiết packages
   - DATABASE_DESIGN.md - 35 collections
   - DEPLOYMENT.md - Deploy guide

3. **Start Phase 1**
   - Design 35 MongoDB schemas
   - Create sample data
   - Build indexes

4. **Build Features**
   - Follow roadmap Excel
   - Tick tasks khi hoàn thành
   - Commit code thường xuyên

---

## 💡 TIPS

### Development Workflow
```bash
# Terminal 1: Backend
cd car-rental-api
npm run start:dev

# Terminal 2: Frontend
cd car-rental-ui
npm run dev

# Terminal 3: MongoDB
mongosh  # Interactive shell

# Terminal 4: Redis
redis-cli  # Interactive shell
```

### VS Code Extensions (Recommended)
- ESLint
- Prettier
- MongoDB for VS Code
- REST Client
- GitLens

### Database GUI Tools
- MongoDB Compass (Official)
- Studio 3T (Advanced)
- RedisInsight (Redis GUI)

---

## 🐛 TROUBLESHOOTING

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community

# Test connection
mongosh
# If OK, you'll see: "MongoDB shell version..."
```

### "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
nest start --port 3001
```

### "Module not found"
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ VERIFY SETUP

Run these commands to verify everything works:

```bash
# Check Node.js
node --version  # Should be v18+

# Check MongoDB
mongosh --eval "db.version()"  # Should show MongoDB version

# Check Redis
redis-cli ping  # Should return "PONG"

# Check NestJS
nest --version  # Should show version

# Check backend
curl http://localhost:3000  # Should return "Hello World!"

# Check frontend
curl http://localhost:3001  # Should return HTML
```

---

**🎉 YOU'RE ALL SET! TIME TO BUILD! 🚀**

**Thời gian:** ~10 phút
**Kết quả:** Full-stack app running
**Next:** Follow roadmap Excel → Start Phase 1

Good luck! 💪
# ⚡ QUICKSTART - BẮT ĐẦU TRONG 10 PHÚT

## 🎯 MỤC TIÊU
Sau 10 phút, bạn sẽ có:
✅ Backend NestJS chạy được
✅ Frontend Next.js chạy được
✅ MongoDB + Redis running
✅ Test được API đầu tiên

---

## BƯỚC 1: INSTALL TOOLS (3 phút)

### MacOS
```bash
# Homebrew (nếu chưa có)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 18+
brew install node

# MongoDB 7
brew tap mongodb/brew
brew install mongodb-community@7.0

# Redis 7
brew install redis

# NestJS CLI (global)
npm i -g @nestjs/cli

# Verify installations
node --version    # v18.0.0+
npm --version     # v9.0.0+
nest --version    # v10.0.0+
mongod --version  # v7.0.0+
redis-server --version  # v7.0.0+
```

### Ubuntu/Linux
```bash
# Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# MongoDB 7
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Redis 7
sudo apt-get install redis-server

# NestJS CLI
sudo npm i -g @nestjs/cli
```

### Windows
```powershell
# Install Node.js from https://nodejs.org
# Install MongoDB from https://www.mongodb.com/try/download/community
# Install Redis from https://redis.io/download (or use Docker)

# NestJS CLI
npm i -g @nestjs/cli
```

---

## BƯỚC 2: CREATE BACKEND (2 phút)

```bash
# Create NestJS project
nest new car-rental-api
cd car-rental-api

# Install MongoDB dependencies
npm install @nestjs/mongoose mongoose

# Install other dependencies
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/config
npm install class-validator class-transformer

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/car-rental
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=1h
PORT=3000
EOF

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux

# Start Redis
brew services start redis              # macOS
sudo systemctl start redis-server      # Linux

# Test backend
npm run start:dev

# Open browser: http://localhost:3000
# Should see: Hello World!
```

---

## BƯỚC 3: CREATE FRONTEND (2 phút)

```bash
# Open new terminal
cd ..

# Create Next.js project
npx create-next-app@latest car-rental-ui --typescript --tailwind --app

# Choose options:
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No

cd car-rental-ui

# Install dependencies
npm install axios @tanstack/react-query
npm install next-auth
npm install react-hook-form zod @hookform/resolvers

# Start frontend
npm run dev

# Open browser: http://localhost:3000
# Should see Next.js homepage
```

---

## BƯỚC 4: CREATE FIRST API (3 phút)

### Backend (NestJS)

```bash
cd car-rental-api

# Generate Vehicle module
nest g module vehicle
nest g controller vehicle
nest g service vehicle

# Generate DTO
nest g class vehicle/dto/create-vehicle.dto --no-spec
```

**Edit: src/vehicle/entities/vehicle.schema.ts**
```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Vehicle extends Document {
  @Prop({ required: true })
  vehicleName: string;

  @Prop({ required: true })
  vehicleType: string;

  @Prop({ required: true })
  licensePlate: string;

  @Prop({ required: true })
  seats: number;

  @Prop({ default: 'AVAILABLE' })
  status: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
```

**Edit: src/vehicle/vehicle.module.ts**
```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle, VehicleSchema } from './entities/vehicle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }])
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
```

**Edit: src/vehicle/vehicle.service.ts**
```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from './entities/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>
  ) {}

  async findAll() {
    return this.vehicleModel.find().exec();
  }

  async create(createVehicleDto: any) {
    const vehicle = new this.vehicleModel(createVehicleDto);
    return vehicle.save();
  }
}
```

**Edit: src/vehicle/vehicle.controller.ts**
```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Post()
  create(@Body() createVehicleDto: any) {
    return this.vehicleService.create(createVehicleDto);
  }
}
```

**Edit: src/app.module.ts**
```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/car-rental'),
    VehicleModule,
  ],
})
export class AppModule {}
```

**Restart backend:**
```bash
npm run start:dev
```

---

## BƯỚC 5: TEST API (1 phút)

### Using cURL
```bash
# Create vehicle
curl -X POST http://localhost:3000/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleName": "Toyota Camry 2024",
    "vehicleType": "Sedan",
    "licensePlate": "29A-12345",
    "seats": 5,
    "status": "AVAILABLE"
  }'

# Get all vehicles
curl http://localhost:3000/vehicles
```

### Using Postman
```
1. Open Postman
2. POST http://localhost:3000/vehicles
3. Body → raw → JSON:
{
  "vehicleName": "Toyota Camry 2024",
  "vehicleType": "Sedan",
  "licensePlate": "29A-12345",
  "seats": 5,
  "status": "AVAILABLE"
}
4. Send
5. GET http://localhost:3000/vehicles
```

---

## BƯỚC 6: CONNECT FRONTEND TO BACKEND (BONUS)

**Create: app/vehicles/page.tsx**
```typescript
'use client';

import { useEffect, useState } from 'react';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/vehicles')
      .then(res => res.json())
      .then(data => setVehicles(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
      <div className="grid gap-4">
        {vehicles.map((vehicle: any) => (
          <div key={vehicle._id} className="border p-4 rounded">
            <h2 className="font-bold">{vehicle.vehicleName}</h2>
            <p>{vehicle.vehicleType} - {vehicle.seats} seats</p>
            <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Visit: http://localhost:3001/vehicles**

---

## 🎉 CONGRATULATIONS!

Bạn đã có:
✅ Backend NestJS với MongoDB
✅ Frontend Next.js với Tailwind
✅ API endpoint hoạt động
✅ Data từ frontend → backend → database

---

## 🚀 NEXT STEPS

1. **Đọc Excel Roadmap**
   - Mở file: Car_Rental_Roadmap_Modern_Stack.xlsx
   - Follow từng task trong Phase 1

2. **Đọc Documentation**
   - TECH_STACK.md - Chi tiết packages
   - DATABASE_DESIGN.md - 35 collections
   - DEPLOYMENT.md - Deploy guide

3. **Start Phase 1**
   - Design 35 MongoDB schemas
   - Create sample data
   - Build indexes

4. **Build Features**
   - Follow roadmap Excel
   - Tick tasks khi hoàn thành
   - Commit code thường xuyên

---

## 💡 TIPS

### Development Workflow
```bash
# Terminal 1: Backend
cd car-rental-api
npm run start:dev

# Terminal 2: Frontend
cd car-rental-ui
npm run dev

# Terminal 3: MongoDB
mongosh  # Interactive shell

# Terminal 4: Redis
redis-cli  # Interactive shell
```

### VS Code Extensions (Recommended)
- ESLint
- Prettier
- MongoDB for VS Code
- REST Client
- GitLens

### Database GUI Tools
- MongoDB Compass (Official)
- Studio 3T (Advanced)
- RedisInsight (Redis GUI)

---

## 🐛 TROUBLESHOOTING

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community

# Test connection
mongosh
# If OK, you'll see: "MongoDB shell version..."
```

### "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
nest start --port 3001
```

### "Module not found"
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ VERIFY SETUP

Run these commands to verify everything works:

```bash
# Check Node.js
node --version  # Should be v18+

# Check MongoDB
mongosh --eval "db.version()"  # Should show MongoDB version

# Check Redis
redis-cli ping  # Should return "PONG"

# Check NestJS
nest --version  # Should show version

# Check backend
curl http://localhost:3000  # Should return "Hello World!"

# Check frontend
curl http://localhost:3001  # Should return HTML
```

---

**🎉 YOU'RE ALL SET! TIME TO BUILD! 🚀**

**Thời gian:** ~10 phút
**Kết quả:** Full-stack app running
**Next:** Follow roadmap Excel → Start Phase 1

Good luck! 💪
