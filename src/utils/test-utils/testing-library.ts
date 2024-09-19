import { render, cleanup, RenderOptions } from '@testing-library/vue';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

const container = document.createElement('div');
const style = document.createElement('style');
style.setAttribute('src', '../../style.css');
document.body.appendChild(style);
container.setAttribute('id', 'app');
document.body.appendChild(container);

function customRender<PropsType = Record<string, any>>(
  ui: Parameters<typeof render>[0],
  options?: RenderOptions & { props?: PropsType },
) {
  return render(ui, {
    container: document.body.appendChild(container),
    ...options,
  });
}

// re-export everything
export * from '@testing-library/vue';
export { customRender as render };
