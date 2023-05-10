'use client';
import useSearchModal from "@/app/hooks/useSearchModal";
import Modals from "@/app/components/modals/Modals";

import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useMemo, useState} from "react";
import {Range} from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, {CountrySelectValue} from "@/app/components/Input/CountrySelect";
import qs from "query-string";
import {formatISO} from "date-fns";

import Heading from "@/app/components/Heading";
import {Calendar} from "@/app/components/Input/Calendar";
import Counter from "@/app/components/Input/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {

    const searchModal = useSearchModal()
    const router = useRouter()
    const params = useSearchParams()
    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathRoomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])
    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])
    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext()
        }
        let currentQuery = {}
        if (params) {
            currentQuery = qs.parse(params.toString())

        }
        const UpadetedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,


        }
        if (dateRange.startDate) {
            UpadetedQuery.startDate = formatISO(dateRange.startDate)
        }
        if (dateRange.endDate) {
            UpadetedQuery.endDate = formatISO(dateRange.endDate)
        }
        const url = qs.stringifyUrl({
            url: '/',
            query: UpadetedQuery
        })
        setStep(STEPS.LOCATION)
        searchModal.onClose();
        router.push(url)
    }, [
        step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Where do you wanna go" subTitle=" Find the perfect location"/>
            <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)}/>
            <hr/>
            <Map center={location?.latlng}/>
        </div>
    )
    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="When do you plan to go" subTitle="Make sure"/>
                <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)}/>
            </div>
        )
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="More infomation" subTitle="Find your prefect place"/>
                <Counter
                    onChange={(value) => setGuestCount(value)}
                    value={guestCount}
                    titles="Guests"
                    subtitle="How many guests are coming?"
                />
                <hr/>
                <Counter
                    onChange={(value) => setRoomCount(value)}
                    value={roomCount}
                    titles="Rooms"
                    subtitle="How many rooms do you need?"
                />
                <hr/>
                <Counter
                    onChange={(value) => {
                        setBathRoomCount(value)
                    }}
                    value={bathroomCount}

                    titles="Bathrooms"
                    subtitle="How many bahtrooms do you need?"
                />

            </div>
        )
    }
    return (
        <Modals
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            actionLabel={actionLabel}
            title="Filters"
            secondaryLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    );
};

export default SearchModal;