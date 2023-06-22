
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

이와 별개로 커링함수를 활용하는 방법이 있습니다.
```ts

import { Input , Select } from '@chakra-ui/react';
import React, {Fragment, useEffect, useState} from 'react';
import useSearchVariable from "../../../Hooks/useSearchVariable";

const Templates = () => {

    const init = {
        sch_keyword: ""
    }
    const [schVariable , setSchVariable] = useState(init);

    const handleSchVariable = (type: string) => (value: string | number) :void => {
        console.log(type)
        setSchVariable( (schVariable) => {
            return {
                ...schVariable,
                [type]: value
            }
        })
    }


    useEffect(() => {
        console.log("testsetsets     ===   " , schVariable.sch_keyword)
    } , [schVariable])
    return (
        <Fragment>
            <Search handleSchVariable={handleSchVariable}/>
            <List schVariable={schVariable} />
        </Fragment>
    );
};
interface PropsInterface {
    handleSchVariable: (type: string) => (value: string | number) => void
}

const Search = ({handleSchVariable} : PropsInterface) => {

    const initSearchVariable = {
        sch_keyword: "",
        filter: "1"
    }
    const [searchVariable, onChangeVariable, reset] = useSearchVariable(initSearchVariable);

    const selectBoxOnChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
    }

    const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target as HTMLInputElement;
        handleSchVariable("sch_keyword")(value)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSchVariable("sch_keyword")(searchVariable.sch_keyword)
        }
    }

    useEffect(() => {
        console.log(searchVariable)
    } , [searchVariable])

    return (
        <>
            <Select onChange={onChangeVariable} defaultValue={searchVariable.filter} name={"filter"}>
                <option value='1'>Option 1</option>
                <option value='2'>Option 2</option>
                <option value='3'>Option 3</option>
            </Select>
            <input value={searchVariable.sch_keyword} onChange={onChangeVariable} name={"sch_keyword"} onBlur={onBlur} onKeyDown={onKeyDown}/>
        </>
    )
}

interface testListInterface {
    value: string
}

interface ListProps {
    sch_keyword: string
}
type PropsType = {schVariable: ListProps}

const List = ({schVariable} : PropsType) => {
    const testList = [
        {
            value: "test1"
        },
        {
            value: "2222"
        },
        {
            value: "4444"
        }
    ]

    const [list ,setList] = useState(testList);

    useEffect(() => {
        setList( () => testList.filter((value: testListInterface) => value.value.includes(schVariable.sch_keyword)) )
    } , [schVariable])



    return (
        <>
        {
            list.map((value: testListInterface) => <p key={value.value}>{value.value}</p>)
        }
        </>
    )
}


export default Templates;
```

