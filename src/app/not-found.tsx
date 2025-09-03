import { Suspense } from 'react';
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find the requested page.</p>

      {/* 包裹使用 useSearchParams() 的组件 */}
      <Suspense fallback={<p>Loading...</p>}>
    11
      </Suspense>
    </div>
  );
}