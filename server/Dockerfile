FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY . .

ENV PORT=8787
EXPOSE 8787

CMD ["node", "index.js"]
