import getTaskProgress from '../src/getTaskProgress';

const VALID_VALUE = 'ddDQb'
const VAALID_RESULR = {
    "Dev days": 2.0,
    "QA days": 1,
    "Blocked": 0.5
}
describe('Task progress function', () => {

    it('translates d to half a dev day', () => {
        const result = getTaskProgress('d')

        expect(result).toEqual({ "Dev": 0.5 })
    })

    it('translates D to one dev day', () => {
        expect(getTaskProgress('D')).toEqual({ 'Dev': 1.0 })
    })

    it('translates dD to one and a half dev days', () => {
        expect(getTaskProgress('dD')).toEqual({ 'Dev': 1.5 })
    })

    it('translates q to half a qa day', () => {
        expect(getTaskProgress('q')).toEqual({ 'QA': 0.5 })
    })
})