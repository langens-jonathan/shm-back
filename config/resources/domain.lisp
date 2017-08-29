(in-package :mu-cl-resources)

(define-resource tenant ()
  :class (s-prefix "real:Tenant")
  :properties `((:name :string ,(s-prefix "foaf:name"))
                (:address :string ,(s-prefix "real:address"))
		(:tel :string ,(s-prefix "real:tel"))
		(:email :string ,(s-prefix "foaf:mbox")))
  :resource-base (s-url "http://example.com/resources/tenants/")
  :has-many `((contract :via ,(s-prefix "real:hasContract")
                        :as "contracts")
              (payment :via ,(s-prefix "real:paid")
                       :as "payments"))
  :on-path "tenants"
)

(define-resource room ()
  :class (s-prefix "real:Room")
  :properties `((:name :string ,(s-prefix "dct:title")))
  :has-many `((contract :via ,(s-prefix "real:operatedOnByContract")
			:as "contracts"))
  :resource-base (s-url "http://example.com/resources/rooms/")
  :on-path "rooms"
)

(define-resource contract ()
  :class (s-prefix "real:Contract")
  :properties `((:start-date :date ,(s-prefix "real:startDate"))
                (:end-date :date ,(s-prefix "real:endDate"))
                (:deposit :string ,(s-prefix "real:deposit"))
		(:mensuality :number ,(s-prefix "real:mensuality"))
		(:dailyRate :number ,(s-prefix "real:dailyRate")))
  :has-one `((tenant :via ,(s-prefix "real:hasContract")
                     :inverse t
                     :as "tenant"))
             ;; (room :via ,(s-prefix "real:operatedOnByContract")
             ;;       :inverse t
             ;;       :as "room"))
  :has-many `((debt :via ,(s-prefix "real:debt")
                    :as "debts")
	      (document :via ,(s-prefix "real:hasDocument")
			:as "documents"))
  :resource-base (s-url "http://example.com/resources/contracts/")
  :on-path "contracts"
)

(define-resource debt ()
  :class (s-prefix "real:Debt")
  :properties `((:amount :string ,(s-prefix "real:amount"))
                (:due :date ,(s-prefix "real:due"))
               (:fulfilled :string ,(s-prefix "real:fulfilled")))
  :has-one `((contract :via ,(s-prefix "real:debt")
                       :inverse t
                       :as "contract"))
  :has-many `((payment :via ,(s-prefix "real:payedFor")
                       :inverse t
                       :as "payments"))
  :resource-base (s-url "http://example.com/resources/contracts/")
  :on-path "debts"
)

(define-resource payment ()
  :class (s-prefix "real:Payment")
  :properties `((:amount :string ,(s-prefix "real:amount")))
  :has-many `((debt :via ,(s-prefix "real:payedFor")
                    :as "debts"))
  :has-one `((tenant :via ,(s-prefix "real:paid")
                     :inverse t
                     :as "tenant"))
  :resource-base (s-url "http://example.com/resources/payments/")
  :on-path "payments"
)

(define-resource comment ()
  :class (s-prefix "real:Comment")
  :properties `((:content :string ,(s-prefix "real:comment"))
		(:context :string ,(s-prefix "real:commentFor")))
  :resource-base (s-url "http://example.com/resources/comments/")
  :on-path "comments"
)

(define-resource document ()
  :class (s-prefix "real:Document")
  :properties `((:url :string ,(s-prefix "real:url")))
  :resource-base (s-url "http://example.com/resources/documents/")
  :has-one `((contract :via ,(s-prefix "real:hasDocument")
		       :inverse t
		       :as "contract"))
  :on-path "documents"
)
