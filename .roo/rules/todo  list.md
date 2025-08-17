# ✅ Initial Checkpoint: Phase 1 Bugs & Structure Fixes

1. **Импорт стилей Tailwind**  
   - [ ] В `src/main.tsx` есть единственный импорт CSS:  
     ```ts
     import "../index.css";   // содержит @tailwind base; components; utilities;
     ```  
   - [ ] Убедиться, что `src/index.css` содержит:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```
   - [ ] Удалить дублирующие CSS-файлы из `styles/` или `components/figma`.

2. **Устранить предупреждение “Function components cannot be given refs”**  
   - [ ] В `components/ui/dialog.tsx` обернуть экспорт `Dialog` через `React.forwardRef`.  
   - [ ] Проверить и аналогично исправить другие компоненты в `components/ui/*`, где используется `ref`.

3. **Убрать версионные суффиксы из импортов Radix и Lucide**  
   - [ ] Заменить все `import ... from "@radix-ui/react-...@x.y.z"` на `import ... from "@radix-ui/react-..."`.  
   - [ ] Удалить номера версий из `lodash-es@...`, `lucide-react@...` и т.п.  
   - [ ] Выполнить `npm install` после правок, чтобы подтянуть правильные пакеты.

4. **Проверка `vite.config.ts` и `package.json`**  
   - [ ] В `package.json` есть скрипты:
     ```json
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     }
     ```
   - [ ] Убедиться, что в `devDependencies` прописаны: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`, `typescript`.  
   - [ ] В `vite.config.ts` подключён React-плагин:
     ```ts
     import react from "@vitejs/plugin-react";
     export default defineConfig({ plugins: [react()] });
     ```

5. **Конфигурация Tailwind / PostCSS**  
   - [ ] В `tailwind.config.js` проверить `content: ["./index.html","./src/**/*.{ts,tsx}"]`.  
   - [ ] В `postcss.config.js` прописаны плагины:
     ```js
     module.exports = {
       plugins: { tailwindcss: {}, autoprefixer: {} }
     };
     ```

6. **Запуск и проверка**  
   - [ ] Выполнить `npm install && npm run dev`.  
   - [ ] Убедиться, что сайт стартует на `http://localhost:5173/` без ошибок в консоли и что Tailwind-стили применяются.  
   - [ ] Исправить оставшиеся оставшиеся ошибки по ходу (копировать текст и заводить новые задачи).

---

> После каждого пункта проси у AI-ассистента конкретный патч, если что-то не заработает, и сверяйся с Phase 1 нашего Roadmap.

::contentReference[oaicite:0]{index=0}
