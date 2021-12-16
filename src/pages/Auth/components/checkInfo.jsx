import React, { useEffect, useState } from 'react';
import { Result, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { userActions } from "redux/actions";
import { userApi } from 'utils/api';
import { Block } from 'components';

const renderTextInfo = ({ hash, verified }) => {
  if (hash) {
    if (verified) {
      return {
        status: 'success',
        title: 'Готово!',
        message: 'Акаунт успішно підтверджено!',
      };
    } else {
      return {
        status: 'error',
        title: 'Помилка',
        message: 'Ви вказали невірний або неіснуючий хеш.',
      };
    }
  } else {
    return {
      status: 'info',
      title: 'Підтвердіть пошту',
      message: 'Посилання з підтвердженням акаунта відпрвравлено на вашу пошту.',
    };
  }
};

const CheckEmailInfo = ({ location, history, user, fetchUserData }) => {
  const hash = location.search.split('hash=')[1];
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(!!hash);
  const [info, setInfo] = useState(renderTextInfo({ hash, checking, verified }));

  const setStatus = ({ checking, verified }) => {
    setInfo(renderTextInfo({ hash, checking, verified }));
    setVerified(verified);
    setChecking(checking);
  };

  useEffect(() => {
    if (hash) {
      userApi
        .verifyHash(hash)
        .then(() => {
          setStatus({ verified: true, checking: false });
        })
        .catch(() => {
          setStatus({ verified: false, checking: false });
        });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className="verify-block">
      <Block>
        {!checking ? (
          <Result
            status={info.status}
            title={info.title}
            subTitle={info.message}
            extra={
              info.status === 'success' &&
              verified && (
                <Button type="primary" onClick={() => history.push('/')}>
                  Ввійти
                </Button>
              )
            }
          />
        ) : (
          <div className="verify-block__loading">
            <Spin size="large" />
          </div>
        )}
      </Block>
    </div>
  );
};

export default connect( ({ user }) => ({ user: user }), userActions )(CheckEmailInfo);;

