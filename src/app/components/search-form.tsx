'use client';

import React, { ChangeEvent, useEffect, useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';

import debounce from 'lodash.debounce';
import { getPathsFromCurrentLocation } from '../common/helper';
import { SEARCH_PATH } from '../common/constants';

export default function SearchForm() {
  const [input, setInput] = useState<string>('');
  const pathname = usePathname();
  const { basePath, param } = getPathsFromCurrentLocation(pathname);
  const router = useRouter();

  const navToSearch = (query: string) => {
    let path = '/';
    if (query.length >= 2) {
      path = `/${SEARCH_PATH}/${query}`;
    }
    router.push(path);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((query) => navToSearch(query), 300),
    [],
  );

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInput(query);
    debounceSearch(query);
  };

  // Runs only once - when page loads
  useEffect(() => {
    const defaultValue = '';
    const inputValue = basePath === SEARCH_PATH ? param ?? defaultValue : defaultValue;
    setInput(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="searchbar d-flex justify-content-start align-items-center">
      <i className="fa fa-search white" aria-hidden="true" />
      <Form>
        <FormGroup>
          <Form.Control
            type="text"
            placeholder="Search by movie title"
            value={input}
            onChange={onChangeHandler}
            className="searchbar-input no-border-radius bg-black"
          />
        </FormGroup>
      </Form>
    </div>
  );
}
