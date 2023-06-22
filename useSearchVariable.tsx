import React, { useCallback, useState } from 'react';

interface SearchVariableInterface {
    [key: string]: string | number;
}

/**
 * 검색 창 변수 스테이트 관리 훅
 * @param initSearchVariable
 */
const useSearchVariable: (
    initSearchVariable: SearchVariableInterface
) => [SearchVariableInterface, (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, () => void] = (
    initSearchVariable: SearchVariableInterface
) => {
    const [searchVariable, setSearchVariable] = useState<SearchVariableInterface>(initSearchVariable);
    // change
    const onChangeVariable = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSearchVariable((schVariable: SearchVariableInterface) => {
            return { ...schVariable, [name]: value };
        });
    }, []);
    // variable 초기화 초기화가 필요할 때 함수로 호출 합니다.
    const reset = useCallback(() => setSearchVariable(initSearchVariable), [initSearchVariable]);

    return [searchVariable, onChangeVariable, reset];
};

export default useSearchVariable;
