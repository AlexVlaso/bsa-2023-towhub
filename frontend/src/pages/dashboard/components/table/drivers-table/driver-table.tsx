import { Button, Modal, Table } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useAppTable,
  useCallback,
  useQueryParameters,
  useState,
} from '~/libs/hooks/hooks.js';
import { type Queries } from '~/libs/hooks/use-query-parameters/use-query-parameters.hook.js';
import { type DriverGetAllResponseDto } from '~/libs/types/types.js';
import { type DriverCreateUpdateRequestDto } from '~/packages/drivers/drivers.js';
import { AddDriverForm } from '~/pages/business/components/add-driver-form/add-driver-form.js';
import { getDriversPage } from '~/slices/drivers/actions.js';
import { actions } from '~/slices/drivers/drivers.js';

import { columns } from './columns/columns.js';
import styles from './styles.module.scss';

const DriverTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { getQueryParameters } = useQueryParameters();
  const { drivers, total, dataStatus } = useAppSelector(({ drivers }) => ({
    drivers: drivers.drivers,
    total: drivers.total,
    dataStatus: drivers.dataStatus,
  }));
  const { size: initialSize, page: initialPage } = getQueryParameters(
    'size',
    'page',
  ) as Queries;

  const [isActiveModal, setIsActiveModal] = useState(false);

  const tableHook = useAppTable<DriverGetAllResponseDto>({
    tableFetchCall: getDriversPage,
    initialPageIndex: initialPage ? +initialPage : undefined,
    initialPageSize: initialSize ? +initialSize : undefined,
  });

  const handleModal = useCallback(() => {
    setIsActiveModal(!isActiveModal);
  }, [isActiveModal]);

  const handleSubmit = useCallback(
    (payload: DriverCreateUpdateRequestDto) => {
      void (async (): Promise<void> => {
        const { size, page } = getQueryParameters('size', 'page') as Record<
          string,
          string
        >;
        await dispatch(actions.addDriver({ payload }));
        await dispatch(actions.getDriversPage({ page: +page, size: +size }));
      })();
      setIsActiveModal(false);
    },
    [dispatch, getQueryParameters],
  );

  const message = (
    <div>
      There are no data here yet. Please,{' '}
      <span className={styles.red}>add new driver</span>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={getValidClassNames('h3', styles.title)}>
          Company Drivers
        </h2>
        <Button
          label="Add a Driver"
          className={styles.btn}
          onClick={handleModal}
        />
      </div>
      <Table
        {...tableHook}
        data={drivers}
        totalRow={total}
        isTableEditable
        columns={columns}
        isLoading={dataStatus === DataStatus.PENDING}
        emptyTableMessage={message}
      />
      <Modal isOpen={isActiveModal} isCentered onClose={handleModal}>
        <div className={styles.formWrapper}>
          <AddDriverForm onSubmit={handleSubmit} />
        </div>
      </Modal>
    </div>
  );
};

export { DriverTable };
