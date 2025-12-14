# Этап сборки
FROM node:20-alpine as build
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект. 
# Результат появится в папке /app/dist
RUN npm run build

# Этап запуска (Nginx)
FROM nginx:alpine

# Удаляем стандартный конфиг nginx, если он мешает (опционально)
# RUN rm /etc/nginx/conf.d/default.conf

# ВАЖНО: Копируем собранные файлы в подпапку /NahuyNftbot,
# так как в vite.config.ts указан base: '/NahuyNftbot/'
COPY --from=build /app/dist /usr/share/nginx/html/NahuyNftbot

# Копируем наш конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
