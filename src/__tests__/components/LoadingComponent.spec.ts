import { fakerPT_BR as faker } from '@faker-js/faker';
import { render } from '@/utils/test-utils';

import { LoadingComponent, LoadingComponentProps } from '@/components';

let dataTestId: string;

describe('LoadingComponent', () => {
  beforeEach(() => {
    dataTestId = faker.lorem.slug();
  });

  it('shoud be able render component', () => {
    const container = render<LoadingComponentProps>(LoadingComponent, {
      props: {
        dataTestId,
      },
    });

    const sut = container.getByTestId(dataTestId);

    expect(sut).toBeDefined();
  });
  it('shoud be able get component without dataTestId', () => {
    const container = render<LoadingComponentProps>(LoadingComponent);

    const sut = container.getByTestId('loading-component');

    expect(sut).toBeDefined();
  });

  it('shoud be able render component image', () => {
    const dataTestId = faker.lorem.slug();
    const container = render<LoadingComponentProps>(LoadingComponent, {
      props: {
        dataTestId,
      },
    });

    const sut = container.getByTestId(`${dataTestId}-image`);

    expect(sut).toBeDefined();
  });
});
