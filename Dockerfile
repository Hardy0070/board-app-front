COPY package.json .

RUN npm install

COPY . .

EXPOSE 30000

CMD ["npm", "start"]