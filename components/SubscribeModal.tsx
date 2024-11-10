"use client"

import { ProductWithPrice } from "@/types";
import Modal from "./Modal"
import Button from "./Button";

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({
    products
}) => {
    let content = (
        <div className="text-center">
            No products available
        </div>
    );

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return (
                            <div key={product.id}>
                                No prices available
                            </div>
                        );
                    }

                    return product.prices.map((price) => (
                        <Button key={price.id}>
                            {`Subscribe for ${}`}
                        </Button>
                    ))
                })}
            </div>
        )
    }

    return (
        <Modal
        title="Only for premium users"
        description="Listen to music with Lmusic Premium"
        isOpen
        onChange={() => {}}
        >
            {content}
        </Modal>
    )
}

export default SubscribeModal;