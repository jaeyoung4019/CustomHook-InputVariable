
## useSearchVariable
  검색 창 input variable 을 만들어주는 Hooks 입니다.
```ts
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

```



사용법
```ts
<Input type={"text"} disabled={true} name={"email"} onChange={onChangeVariable} value={variable.email}/>
<Input type={"text"} name={"name"} onChange={onChangeVariable} value={variable.name}/>
<Input type={"text"} name={"location"} onChange={onChangeVariable} value={variable.location}/>
<textarea name={"bio"} onChange={onChangeVariable} value={variable.bio}/>
<Input type={"text"} name={"link"} onChange={onChangeVariable}  value={variable.link}/>
<Input type={"file"}/>
<NextButtonGrid handleNextButton={handleNextButton}/>
```
name -> 변수 명 value에 들어갈 변수명과 일치하게 넣어주면 됩니다.
