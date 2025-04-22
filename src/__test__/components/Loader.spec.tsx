import { render } from "@testing-library/react"
import Loader from "../../components/Loader"

describe('Given loader comp', () => {
    it('render loader', () => {
        render(
            <Loader />
        )
    })
})