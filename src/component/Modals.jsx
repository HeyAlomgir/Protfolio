"use client";

import { Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import { IoIosArrowRoundForward } from "react-icons/io";

export function Modals({ service }) {

  return (
    <Modal>

      {/* Open Button */}
      <Button
        className="bg-transparent text-cyan-600 font-bold text-xs p-0 min-w-0 h-auto flex items-center gap-1 hover:bg-transparent"
      >
        View More

        <IoIosArrowRoundForward
          className="text-xl transform transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </Button>

      {/* Modal */}
      <Modal.Backdrop>

        <Modal.Container>

          <Modal.Dialog className="sm:max-w-64 md:max-w-xl rounded-3xl p-6">

            {/* Close Button */}
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header className="justify-center">

              <Modal.Icon className="bg-blue-100 text-blue-600">
                <Rocket className="size-5" />
              </Modal.Icon>

            </Modal.Header>

            {/* Body */}
            <Modal.Body className="py-6">

              {/* Title & Description */}
              <div className="text-center">

                <h2 className="text-3xl font-bold text-black">
                  {service.title}
                </h2>

                <p className="text-gray-500 mt-4 leading-7 max-w-md mx-auto">
                  {service.description}
                </p>

              </div>

              {/* Features */}
              <div className="space-y-2 mt-5">

                {
                  service.features.map((feature, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >

                      {/* Check Icon */}
                      <span className="text-blue-500 text-lg mt-1">
                        ✓
                      </span>

                      {/* Feature Text */}
                      <p className="text-gray-700 text-base leading-7">
                        {feature}
                      </p>

                    </div>

                  ))
                }

              </div>

            </Modal.Body>

          </Modal.Dialog>

        </Modal.Container>

      </Modal.Backdrop>

    </Modal>
  );
}